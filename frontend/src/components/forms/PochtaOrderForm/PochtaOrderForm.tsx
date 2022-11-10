import { FC, useEffect, useReducer, useState } from "react";
import st from "./PochtaOrderForm.module.scss"
import config from "../../../config.json"
import {IDeliverypoint, IOrder } from "../../../interfaces";
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

export const PochtaOrderForm: FC<PropTypes>=({order, setOrder, setLocalityData, locationData, modalForceUpdate, deliverypoints, setDeliverypoints}) => {
    const [disabledDeliveryPointSelect, setDisabledDeliveryPointSelect] = useState(true)
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    async function calculateCostOfDelivery(locationData: DaDataSuggestion<DaDataAddress>){
        fetch(config.backend + "/getInformation").then(res=>res.json()).then((result)=>{
            let url = config.backend + "/calculateCostOfDeliverySdek"
            let body = {"to_location": locationData?.data.city, "to_country_code": locationData?.data.country_iso_code, "from_location": result.data.location, "from_country_code": result.data.country_code, "tariff_code": result.data.tariff_code}        

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
        fetch(config.backend + "/getDeliverypointsSdek/"+locationData?.data.city+"/"+locationData?.data.country_iso_code).then(res=>res.json()).then((result)=>{console.log(result); setDeliverypoints(sortDeliverypoints(result.data)); setDisabledDeliveryPointSelect(false)}) 
    }

    function sortDeliverypoints(deliverypoints: IDeliverypoint[]){
        function SortArray(x: IDeliverypoint, y: IDeliverypoint){
            return x.name.localeCompare(y.name);
        }
        return deliverypoints.sort(SortArray)
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
        <div id={st["delivery-poschta-forma"]}>
            <label>Ваш адрес
                <AddressSuggestions filterLocationsBoost={[]} filterLocations={[
                    { "country": "Россия" },
                    { "country": "Казахстан" },
                    { "country": "Беларусь" },
                    { "country": "Украина" }
                ]} token="e2e60336d7b861dd95c3ee3d08e81546b51a8afe" value={locationData} onChange={(location: any )=>{setLocalityData(location); console.log("location", location); order.location=location.data.city; order.delivery_point="Нет"; order.delivery_point_code="Нет"; order.cost_of_delivery = 0; setOrder(order); calculateCostOfDelivery(location)}} />
            </label> 
        </div>
    );
}