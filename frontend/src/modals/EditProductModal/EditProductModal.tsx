import { FC, useEffect, useState } from "react"
import { Modal } from "../../components/common/Modal/Modal"
import st from "./EditProductModal.module.scss"
import axios from "axios"
import config from "../../config.json"
import { IParam, IProduct } from "../../structs"

interface PropTypes{
    onClose: ()=>void
    flagUpdate: ()=>void
    product: IProduct
}

export const EditProductModal: FC<PropTypes>=({onClose, flagUpdate, product}) => {
    const [title, setTitle] = useState(product.title_product)
    const [price, setPrice] = useState(product.price)
    const [description, setDescription] = useState(product.description)
    const [available, setAvailable] = useState(product.available)


    const [parameters, setParameters] = useState<IParam[]>()
    const [checkedParams, setCheckedParams] = useState<IParam[]>()
   
    document.body.style.overflowY = "hidden"
    
    function complite(){
        let url = config.backend.host + config.backend.port + "/updateProduct"
        let body = {"product_id": product.product_id,
                    "title_product": title,
                    "description": description,
                    "price": price,
                    "available": available,
                    "type_id": product.type_id,
                    "parameters": checkedParams
        }
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
    
    function handlerSelectedParameterValues(e: any, targetParam: IParam){
        console.log(checkedParams);
        console.log(product);
        
        if (e.target.checked === true){
            checkedParams?.map(parameter=> {parameter.parameter_id === targetParam.parameter_id && parameter.values.push(e.target.value); parameter.values.sort(
                function (a,b) {
                    let av = Number(a), bv = Number(b);
                    return av < bv ? -1 : av > bv ? 1 : 0;
                })})
        }else{
            checkedParams?.map(parameter=> {parameter.parameter_id === targetParam.parameter_id && parameter.values.splice(parameter.values.map(el => el).indexOf(e.target.value), 1)})
        }
    }
    useEffect(()=>{
        fetch(config.backend.host + config.backend.port + "/defaultParameterValuesByType/" + product.type_id).then(res=>res.json()).then((params)=>setParameters(params))
        fetch(config.backend.host + config.backend.port + "/productParameterValuesByType/" + product.type_id + "/" + product.product_id).then(res=>res.json()).then((params)=>setCheckedParams(params))                
    }, [])

    return (
        <Modal onClose={onClose} closingBackground={true}>
        <div id={st["edit-product-modal"]}>
            <div className={st["title"]}><strong > Добавление в корзину</strong></div>
            <table>
                <tbody>
                <tr><td>Товар: </td><td><input type="text" defaultValue={product.title_product} placeholder={product.title_product} onChange={(e)=>setTitle(e.target.value)}/></td></tr>
                <tr><td>Цена: </td><td><input type="number" defaultValue={product.price} placeholder={product.price.toString()} onChange={(e)=>setPrice(Number(e.target.value))}/> ₽</td></tr>
                <tr><td>Описание: </td><td><input type="text" defaultValue={product.description} placeholder={product.description} onChange={(e)=>setDescription(e.target.value)} /></td></tr>
                {parameters?.map((param, paramIndex)=>
                    <tr key={paramIndex}>
                        <td>{param.title_parameter} %: </td>
                        <td><div className={st["product-card-parameter"]}>
                        {param.values.map((value, valueIndex)=>
                            <div key={valueIndex}>
                                {checkedParams !== undefined && <input type="checkbox" onChange={(e)=>handlerSelectedParameterValues(e, param)} className={st["parameter-checkbox"]} name={param.group} id={"parameter-"+value} value={value} defaultChecked={checkedParams !== undefined && checkedParams[paramIndex].values.indexOf(parameters[paramIndex].values[valueIndex]) != -1}/>}
                                <label htmlFor={"parameter-"+value} >{value}</label>
                            </div>
                        )}
                        </div></td>
                    </tr>
                )}
                <div>В наличии<input type="checkbox" name="available" id="availableCheckBox" defaultChecked={available} onChange={(e)=>setAvailable(e.target.checked)}/></div>
                </tbody>
            </table>
            <button onClick={complite}>Готово</button>
        </div>
    </Modal>
    )
}