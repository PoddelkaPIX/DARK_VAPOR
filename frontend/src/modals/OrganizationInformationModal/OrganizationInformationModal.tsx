import { FC, useEffect, useReducer, useState } from "react";
import st from "./OrganizationInformationModal.module.scss"
import config from "../../config.json"
import { IDeliverypoint, IInformation } from "../../structs";
import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from "react-dadata";

interface PropTypes{
    onClose: ()=>void
}

export const OrganizationInformationModal: FC<PropTypes>=({onClose}) => {
    const [client_information, setClientInformation] = useState<IInformation>()
    const [name_editing, set_name_editing] = useState(false)
    const [locality_editing, set_locality_editing] = useState(false)
    const [telephone_editing, set_telephone_editing] = useState(false)
    const [delivery_point_sdek_editing, set_delivery_point_sdek_editing] = useState(false)

    const [name, set_name] = useState("")
    const [locality, set_locality] = useState("")
    const [locality_fias_id, set_locality_fias_id] = useState("")
    const [telephone, set_telephone] = useState("")
    const [delivery_point_sdek, set_delivery_point_sdek] = useState("")
    const [delivery_point_code_sdek, set_delivery_point_code_sdek] = useState("")

    const [localityData, setLocalityData] = useState<DaDataSuggestion<DaDataAddress>>();
    const [deliverypoints, setDeliverypoints] = useState<IDeliverypoint[]>([])

    const [_count, forceUpdate] = useReducer(x => x + 1, 0);

    function fill_fields(info: IInformation){
        setClientInformation(info)
        set_name(info.name)
        set_locality(info.locality)
        set_locality_fias_id(info.locality_fias_id)
        set_telephone(info.telephone)
        set_delivery_point_sdek(info.delivery_point_sdek)
        set_delivery_point_code_sdek(info.delivery_point_code_sdek)
    }

    function edit_name(){
        fetch(config.backend.host + config.backend.port + "/editName/"+name)
        forceUpdate()
    }

    function edit_locality(){
        if (localityData?.data.city !== undefined && localityData?.data.city_fias_id != undefined){
            fetch(config.backend.host + config.backend.port + "/editLocality/"+localityData?.data.city+"/"+localityData?.data.city_fias_id)
            set_delivery_point_code_sdek(localityData?.data.city_fias_id)
        }
        forceUpdate()
    }

    function edit_telephone(){
        fetch(config.backend.host + config.backend.port + "/editTelephone/"+telephone)
        forceUpdate()
    }

    function edit_delivery_point_sdek(){
        fetch(config.backend.host + config.backend.port + "/editDeliveryPointSdek/"+delivery_point_sdek+"/"+delivery_point_code_sdek)
        forceUpdate()
    }

    function edit_delivery_point_pochta(){
        fetch(config.backend.host + config.backend.port + "/editDeliveryPointPochta/"+delivery_point_sdek)
        forceUpdate()
    }

    function complite(){
        onClose()
    }
    function sortDeliverypoints(deliverypoints: IDeliverypoint[]){
        function SortArray(x: IDeliverypoint, y: IDeliverypoint){
            return x.name.localeCompare(y.name);
        }
        return deliverypoints.sort(SortArray)
    }
    function getDeliverypoints(data: string){
        fetch(config.backend.host + config.backend.port + "/getDeliverypointsSdek/"+data).then(res=>res.json()).then((result)=>{setDeliverypoints(sortDeliverypoints(result))}) 

    }
    useEffect(()=>{
        fetch(config.backend.host + config.backend.port + "/getInformation").then(res=>res.json()).then((result)=>{fill_fields(result); getDeliverypoints(result.locality_fias_id)})
    }, [forceUpdate, _count])
    
    return (
    <div id={st["organization-information-modal"]}>
        <div id={st["information-forma"]}>
            <div className={st["fielnd"]}>
                <b>Имя отправителя: </b> 
                {!name_editing ? <>
                    <div>{client_information?.name}</div>
                    <button className={st["button-edit"]} onClick={()=>{set_name_editing(true)}}><i className="fa-solid fa-pen"></i></button>
                </>:
                <>
                    <input type="text" defaultValue={client_information?.name} onChange={(e)=>{set_name(e.target.value)}} />
                    <button className={st["button-edit"]} onClick={()=>{set_name_editing(false); edit_name()}}><i className="fa-solid fa-floppy-disk"></i></button>
                </>}
            </div>
            <div className={st["fielnd"]}>
                <b>Город: </b> 
                {!locality_editing ? <>
                    <div>{client_information?.locality}</div>
                    <button className={st["button-edit"]} onClick={()=>{set_locality_editing(true)}}><i className="fa-solid fa-pen"></i></button>
                </>: 
                <>
                    <AddressSuggestions defaultQuery={client_information?.locality} token="e2e60336d7b861dd95c3ee3d08e81546b51a8afe" value={localityData} onChange={(data: any )=>{setLocalityData(data); getDeliverypoints(data.data.fias_id)}} />
                    <button className={st["button-edit"]} onClick={()=>{set_locality_editing(false); edit_locality()}}><i className="fa-solid fa-floppy-disk"></i></button>
                </>}
            </div>
            <div className={st["fielnd"]}>
                <b>Телефон: </b> 
                {!telephone_editing ? <>
                    <div>{client_information?.telephone}</div>
                    <button className={st["button-edit"]} onClick={()=>{set_telephone_editing(true)}}><i className="fa-solid fa-pen"></i></button>
                </>: 
                <>
                    <input type="text" defaultValue={client_information?.telephone} onChange={(e)=>{set_telephone(e.target.value)}}/>
                    <button className={st["button-edit"]} onClick={()=>{set_telephone_editing(false); edit_telephone()}}><i className="fa-solid fa-floppy-disk"></i></button>
                </>}
            </div>
            <div className={st["fielnd"]}>
                <b>Пункт СДЭК для отправки: </b> 
                {!delivery_point_sdek_editing ? <>
                    <div>{client_information?.delivery_point_sdek}</div>
                    <button className={st["button-edit"]} onClick={()=>{set_delivery_point_sdek_editing(true)}}><i className="fa-solid fa-pen"></i></button>
                </>: 
                <>  
                    <select defaultValue={client_information?.delivery_point_code_sdek} onChange={(e)=>{set_delivery_point_sdek(e.target.options[e.target.selectedIndex].text); set_delivery_point_code_sdek(e.target.value)}} >  
                        {deliverypoints.length !== 0 ? deliverypoints?.map((deliverypoint, index)=><option value={deliverypoint.code} key={index}>{deliverypoint.name}</option>): <div>Пункты выдачи не найдены</div>}
                    </select>
                    <button className={st["button-edit"]} onClick={()=>{set_delivery_point_sdek_editing(false); edit_delivery_point_sdek()}}><i className="fa-solid fa-floppy-disk"></i></button>
                </>}
            </div>
            {/* <label>
                <b>Пункт Почты России для отправки: </b> 
                {client_information?.delivery_point_sdek}
                <button className={st["button-edit"]} onClick={()=>{}}><i className="fa-solid fa-pen"></i></button>
            </label> */}
            <button onClick={()=>complite()} id={st["close-button"]}>Закрыть</button>
        </div>
    </div>
    );
}