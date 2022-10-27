import { FC, useEffect, useReducer, useState } from "react";
import st from "./SdekOrderForm.module.scss"
import config from "../../../config.json"
import {IDeliverypoint, IInformation, IOrder } from "../../../structs";
import axios from "axios";
import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from "react-dadata";

interface PropTypes{
    order: IOrder
    setOrder: (order: IOrder)=>void
    localityData?: DaDataSuggestion<DaDataAddress>
    modalForceUpdate: ()=>void
    deliverypoints: IDeliverypoint[]
    setDeliverypoints: (delivery_point: IDeliverypoint[])=>void
    setLocalityData: (data:DaDataSuggestion<DaDataAddress>)=>void
}

export const SdekOrderForm: FC<PropTypes>=({order, setOrder, setLocalityData, localityData, modalForceUpdate, deliverypoints, setDeliverypoints}) => {
    const [, setAdminInformation] = useState<IInformation>({
        "name": "",
        "locality": "",
        "locality_fias_id": "",
        "tariff_code": "",
        "telephone": "",
        "delivery_point_sdek": "",
        "delivery_point_code_sdek": ""
    })
    const [disabledDeliveryPointSelect, setDisabledDeliveryPointSelect] = useState(true)
    const [_count, forceUpdate] = useReducer(x => x + 1, 0);

    async function calculateCostOfDelivery(){
        await fetch(config.backend.host + config.backend.port + "/getInformation").then(res=>res.json()).then((result)=>{setAdminInformation(result);
            let url = config.backend.host + config.backend.port + "/calculateCostOfDeliverySdek"

            let body = {"to_location_fias_id": localityData?.data.fias_id, "from_location_fias_id": result.locality_fias_id, "tariff_code": result.tariff_code}        
            axios({
                method: 'post',
                url: url,
                data: body,
                headers: { "Content-Type": "application/json" },
            })
            .then(function (response) {
                if (response.data.errors !== undefined){  
                    console.log(response.data);
                    alert(response.data.errors[0])
                }else{
                    order.cost_of_delivery = response.data.delivery_sum
                }
                modalForceUpdate()
            })
            .catch(function (error) {
                alert("Какие-то проблемы. Обратитесь за помощью в нашу группу https://vk.com/darkvapor")
                window.location.replace("/")
            });
        })
    }
    function getDeliverypoints(){
        fetch(config.backend.host + config.backend.port + "/getDeliverypointsSdek/"+localityData?.data.fias_id).then(res=>res.json()).then((result)=>{setDeliverypoints(sortDeliverypoints(result));setDisabledDeliveryPointSelect(false)}) 
    }

    function sortDeliverypoints(deliverypoints: IDeliverypoint[]){
        function SortArray(x: IDeliverypoint, y: IDeliverypoint){
            return x.name.localeCompare(y.name);
        }
        return deliverypoints.sort(SortArray)
    }
    
    useEffect(()=>{ 
        if (localityData !== undefined){
            setDeliverypoints([])
            getDeliverypoints()
        }else{
            setDisabledDeliveryPointSelect(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localityData])
    return (
        <div id={st["delivery-sdek-forma"]}>
            <label>Ваш город
                <AddressSuggestions filterLocationsBoost={[]} token="e2e60336d7b861dd95c3ee3d08e81546b51a8afe" value={localityData} onChange={(suggestion: any )=>{setLocalityData(suggestion); setDeliverypoints([]); order.city=""; order.delivery_point=""; order.delivery_point_code=""; order.cost_of_delivery = 0; setOrder(order); forceUpdate()}} />
            </label> 
            <label>Пункт выдачи
                <select disabled={disabledDeliveryPointSelect} onChange={(e)=>{order.delivery_point = e.target.options[e.target.selectedIndex].text; order.delivery_point_code = e.target.value; setOrder(order); calculateCostOfDelivery(); modalForceUpdate()}}>  
                    <option value={""}>Не указан</option>  
                    {deliverypoints.length !== 0 ? deliverypoints?.map((deliverypoint, index)=><option value={deliverypoint.code} key={index}>{deliverypoint.name}</option>): <div>Пункты выдачи не найдены</div>}
                </select>
            </label> 
        </div>
    );
}