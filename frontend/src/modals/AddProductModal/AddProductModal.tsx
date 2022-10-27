import { FC, useEffect, useState } from "react";
import st from "./AddProductModal.module.scss"
import config from "../../config.json"
import { IParam, IProduct } from "../../structs";

interface PropTypes{
    product: IProduct
    onClose: ()=>void
    setProducts: (item:IProduct)=>void
}

export const AddProductModal: FC<PropTypes>=({onClose, product, setProducts}) => {
    const [count, setCount] = useState(1)
    const [disabledComplite, setDisabledComplite] = useState(true)
    const [params, setParams] = useState<IParam[]>([])
    const [selectParameters, setSelectParameters] = useState<{[index: string]:IParam}>({})
    const [parameterGroups, setParameterGroups] = useState<string[]>([])
    
    document.body.style.overflowY = "hidden"
    
    function handlerSelectParameter(e: any, parameter: IParam){
        let parameterClone = Object.assign({}, parameter); 
        parameterClone.values = [e.target.value]
        selectParameters[parameterClone.group] = parameterClone
        setSelectParameters(selectParameters)
        if (parameterGroups.length === Object.keys(selectParameters).length){
            setDisabledComplite(false)
        }else{
            setDisabledComplite(true)
        }    
    }

    function updateParameterGroups(Zparams: IParam[]){
        for (let item of Zparams){
            parameterGroups.push(item.group)
        }
        let a: string[] = parameterGroups.filter(function(item, pos) {
            return parameterGroups.indexOf(item) === pos;
        })
        
        setParameterGroups(a)
    }

    function updateCount(coun: number){
        if (count+coun>=1 && count+coun<=255){
            setCount(count+coun)
        }        
    }
    function complite(){
        let arr: IParam[] = []
        for (let key of Object.keys(selectParameters)){
            arr.push(selectParameters[key])
        }
        onClose()
        setProducts({
            "product_id": product.product_id,
            "title_product": product.title_product,
            "price": product.price,
            "title_category": product.title_category,
            "category_id": product.category_id,
            "title_type": product.title_type,
            "type_id": product.type_id,
            "parameters": arr,
            "count": count})
    }

    useEffect(()=>{
        if (params.length === 0){
            fetch(config.backend.host + config.backend.port + "/productParameterValuesByType/" + product.type_id + "/" + product.product_id).then(res=>res.json()).then((params)=>{setParams(params); updateParameterGroups(params); {params.length === 0 && setDisabledComplite(false)}})
        } 
    }, [])
    
    return (
    <div id={st["add-liquid-modal"]}>
        <div className={st["title"]}><strong > Добавление в корзину</strong></div>
        <table>
            <tbody>
            <tr><td>Товар: </td><td>{product.title_product}</td></tr>
            <tr><td>Цена: </td><td>{product.price} ₽</td></tr>
            {params?.map((param, index)=>
            <tr key={index}>
                <td>{param.title_parameter} %: </td>
                <td className={st["product-card-nicotine"]}>
                {param.values.map((value, index)=>
                    <div key={index}>
                    <input type="radio" name={param.group} id={"nicotine-"+value} value={value} onChange={(e)=>handlerSelectParameter(e, param)}></input>
                    <label htmlFor={"nicotine-"+value} >{value}</label>
                    </div>)}
                </td>
            </tr>
            )}
            </tbody>
        </table>
        <div className={st["product-number"]}>
            <button onClick={()=>updateCount(-1)}>-</button>
            <input type="number" value={count} className={st["quantity"]} disabled={true}/>
            <button onClick={()=>updateCount(1)}>+</button>
        </div>
        <button className={st["button-complite"]} onClick={complite} disabled={disabledComplite}>Готово</button>
    </div>
    );
}