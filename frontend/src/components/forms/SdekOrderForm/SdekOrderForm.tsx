import { FC, useEffect, useReducer, useState } from "react";
import st from "./SdekOrderForm.module.scss"
import config from "../../../config.json"
import {IDeliverypoint, IInformation, IOrder } from "../../../interfaces";
import axios from "axios";
import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from "react-dadata";

interface PropTypes{
    order: IOrder
    setOrder: (order: IOrder)=>void
    locationData?: DaDataSuggestion<DaDataAddress>
    modalForceUpdate: ()=>void
    deliverypoints: IDeliverypoint[]
    setDeliverypoints: (delivery_point: IDeliverypoint[])=>void
    setLocalityData: (data:DaDataSuggestion<DaDataAddress>)=>void
}

export const SdekOrderForm: FC<PropTypes>=({order, setOrder, setLocalityData, locationData, modalForceUpdate, deliverypoints, setDeliverypoints}) => {
    const [disabledDeliveryPointSelect, setDisabledDeliveryPointSelect] = useState(true)
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    async function calculateCostOfDelivery(locationData: DaDataSuggestion<DaDataAddress>){
        fetch(config.backend + "/getInformation").then(res=>res.json()).then((result)=>{
            let url = config.backend + "/calculateCostOfDeliverySdek"
            let body = {"to_location": locationData?.data.city, "to_country_code": locationData?.data.country_iso_code, "to_region": locationData?.data.region, "from_location": result.data.location, "from_country_code": result.data.country_code, "from_region": result.data.region,"tariff_code": result.data.tariff_code}        

            axios({
                method: 'post',
                url: url,
                data: body,
                headers: { "Content-Type": "application/json" },
            })
            .then(function (response) {
                if (response.data.errors !== undefined){  
                    alert(response.data.errors[0])
                }else{
                    if (response.data.data.delivery_sum !== undefined){
                        order.cost_of_delivery = response.data.data.delivery_sum
                        order.sender_name = result.data.name
                        order.sender_phone_number = result.data.telephone
                        setOrder(order)
                    }
                }
                modalForceUpdate()
                forceUpdate()
            })
            .catch(function (error) {
                alert("Какие-то проблемы. Обратитесь за помощью в нашу группу https://vk.com/darkvapor")
                window.location.replace("/")
            });
        })
    }
    function getDeliverypoints(){
        fetch(config.backend+"/getDeliverypointsSdek/"+locationData?.data.city+"/"+locationData?.data.country_iso_code+"/"+locationData?.data.region).then(res=>res.json()).then((result)=>{setDeliverypoints(sortDeliverypoints(result.data)); setDisabledDeliveryPointSelect(false)}) 
    }

    function sortDeliverypoints(deliverypoints: IDeliverypoint[]){
        function SortArray(x: IDeliverypoint, y: IDeliverypoint){
            return x.name.localeCompare(y.name);
        }
        return deliverypoints.sort(SortArray)
    }
    function handlerCityChanged(location: DaDataSuggestion<DaDataAddress>){
        setLocalityData(location); 
        setDeliverypoints([]); 
        order.location=""; 
        order.delivery_point=""; 
        order.delivery_point_code=""; 
        order.country="";
        order.country_code="";
        order.region="";
        order.delivery_point_code="";
        order.cost_of_delivery = 0; 
        setOrder(order); 
        calculateCostOfDelivery(location)
    }
    function handlerDeliveryPointChanged(e: any){
        order.delivery_point = e.target.options[e.target.selectedIndex].text; 
        order.delivery_point_code = e.target.value; 
        setOrder(order); 
        modalForceUpdate()
    }
    useEffect(()=>{ 
        if (locationData !== undefined){
            setDeliverypoints([])
            getDeliverypoints()
        }else{
            setDisabledDeliveryPointSelect(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationData])
    return (
        <div id={st["delivery-sdek-forma"]}>
            <label>Ваш город
                <div className={st["container-input"]}>
                    <AddressSuggestions filterLocationsBoost={[]} filterLocations={[
                        { "country": "Россия" },
                        { "country": "Казахстан" },
                        { "country": "Беларусь" },
                        { "country": "Украина" }
                    ]} token="e2e60336d7b861dd95c3ee3d08e81546b51a8afe" value={locationData} onChange={(location: any )=>{handlerCityChanged(location)}} />
                </div>
                </label> 
            <label>Пункт выдачи
                <select disabled={disabledDeliveryPointSelect} onChange={(e)=>handlerDeliveryPointChanged(e)}>  
                    <option value={""}>Не указан</option>  
                    {deliverypoints.length !== 0 ? deliverypoints?.map((deliverypoint, index)=><option value={deliverypoint.code} key={index}>{deliverypoint.name}</option>): <div>Пункты выдачи не найдены</div>}
                </select>
            </label> 
        </div>
    );
}