import { FC, useEffect, useState } from "react";
import { IProduct } from "../../App";
import st from "./AddProductModal.module.scss"

interface PropTypes{
    product: IProduct
    onClose: ()=>void
    setProducts: (item:IProduct)=>void
}

export const AddProductModal: FC<PropTypes>=({onClose, product, setProducts}) => {
    const [count, setCount] = useState(1)
    const [strength, setStrength] = useState<number>()
    const [salt, setSalt] = useState<number>()
    const [disabledComplite, setDisabledComplite] = useState(true)

    const strengthUndefined = product.strengths?.values.length !== undefined
    const saltUndefined = product.salts?.values.length !== undefined

   
  
    function updateCount(coun: number){
        if (count+coun>=1 && count+coun<=20){
            setCount(count+coun)
        }
    }
    function complite(){
        onClose()
        setProducts({
            "id": product.id,
            "title": product.title,
            "price": product.price,
            "type": product.type,
            "strength": strength,
            "salt": salt,
            "count": count})
    }

    useEffect(()=>{
        if ((strength !== undefined || strengthUndefined === false) &&
            (salt !== undefined || saltUndefined === false)){
                setDisabledComplite(false)
        }else{
            setDisabledComplite(true)
        }
        
    }, [strength, product.strengths?.values.length, product.salts?.values.length, salt, strengthUndefined, saltUndefined])
    return (
    <div id={st["add-liquid-modal"]}>
        <div className={st["title"]}><strong > Добавление в корзину</strong></div>
        <table>
            <thead>
                
            </thead>
            <tbody>
            <tr><td>Товар: </td><td>{product.title}</td></tr>
            <tr><td>Цена: </td><td>{product.price} ₽</td></tr>
            {strengthUndefined && 
                <tr><td>Крепость (%): </td><td>
                    <div className={st["product-card-strength"]}>
                        {product.strengths?.values.map(strength => <div key={strength.title}>
                        <input type="radio" name={"strength-radio"} id={"strength-"+strength.value} onChange={()=>setStrength(strength.value)}></input>
                        <label htmlFor={"strength-"+strength.value} >{strength.title}</label>
                        </div>)}
                    </div>
                </td></tr>}
                {saltUndefined && 
                <tr><td>Соль (%): </td><td>
                    <div className={st["product-card-salt"]}>
                        {product.salts?.map(salt => <div key={salt.title}>
                        <input type="radio" name={"salt-radio"} id={"salt-"+salt.value} onChange={()=>setSalt(salt.value)}></input>
                        <label htmlFor={"salt-"+salt.value} >{salt.title}</label>
                        </div>)}
                    </div>
                </td></tr>}
                <tr><td>Сумма: </td><td>{product.price * count} ₽</td></tr>
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