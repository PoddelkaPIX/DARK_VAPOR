import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Modal } from "../../components/common/Modal/Modal";
import st from "./AddProductInDataBaseModal.module.scss"
import config from "../../config.json"


interface IParam{
    parameter_id: number
    title_parameter: string
    group: string
    values: string[]
}

interface PropTypes{
    onClose: ()=>void
    typeId: string
    flagUpdate: ()=>void
}


export const AddProductInDataBaseModal: FC<PropTypes>=({onClose, typeId, flagUpdate}) => {
    const [parameters, setParameters] = useState<IParam[]>()
    const [selectParameters, setSelectParameters] = useState<IParam[]>()
    let selectTitle = ""
    let selectDescription = ""
    let selectPrice = ""
    let available = true
  

    function handlerSelectedParameterValues(e: any, targetParam: IParam){
        if (e.target.checked === true){
            selectParameters?.map(parameter=> {parameter.parameter_id === targetParam.parameter_id && parameter.values.push(e.target.value); parameter.values.sort(
                function (a,b) {
                    let av = Number(a), bv = Number(b);
                    return av < bv ? -1 : av > bv ? 1 : 0;
            })})
        }else{
            selectParameters?.map(parameter=> {parameter.parameter_id === targetParam.parameter_id && parameter.values.splice(parameter.values.map(el => el).indexOf(e.target.value), 1)})
        }
    }
    
    useEffect(()=>{
        fetch(config.backend.host + config.backend.port + "/defaultParameterValuesByType/"+typeId).then(res=>res.json()).then((result)=>{setParameters(result); setSelectParameters(result)})
    }, [])

    function complite(){
        let url = config.backend.host + config.backend.port + "/addProduct"
        let body = {"title_product": selectTitle, 
                    "description": selectDescription,
                    "price": selectPrice,
                    "available": available,
                    "type_id": Number(typeId),
                    "parameters": selectParameters}
        axios({
            method: 'post',
            url: url,
            data: body,
            headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
            console.log(response);
            flagUpdate()
        })
        .catch(function (error) {
            console.log(error);
        });
        onClose()
    }
    return (
        <Modal onClose={onClose} closingBackground={true}>
            <div id={st["add-product-modal"]}>
                <input type="text" placeholder="Название" onChange={(e)=>{selectTitle = (e.target.value)}}/>
                <input type="number" placeholder="Цена"  onChange={(e)=>{selectPrice = (e.target.value.toString())}} />
                <input type="text" placeholder="Описание"  onChange={(e)=>{selectDescription = (e.target.value)}}/>
                <table>
                    <tbody>
                        {parameters?.map((param, index)=>
                            <tr key={index}>
                                <td>{param.title_parameter} %: </td>
                                <td><div className={st["product-card-parameter"]}>
                                {param.values.map((value, index)=>
                                    <div key={index}>
                                        <input type="checkbox" onChange={(e)=>handlerSelectedParameterValues(e, param)} className={st["parameter-checkbox"]} name={param.group} id={"parameter-"+value} value={value} defaultChecked={true}/>
                                        <label htmlFor={"parameter-"+value} >{value}</label>
                                    </div>
                                )}
                                </div></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div>В наличии <input type="checkbox" name="available" id="availableCheckBox" defaultChecked={true} onChange={(e)=>{available = (e.target.checked)}}/></div>
                <button onClick={complite} className={st["button-complite"]}>Готово</button>
            </div>
        </Modal>
    );
}