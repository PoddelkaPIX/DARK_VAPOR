import { FC, useEffect, useState } from "react";
import { IProduct } from "../../App";
import { BasketProductCard } from "../../components/cards/BasketProductCard/BasketProductCard";
import st from "./BasketModal.module.scss"

interface PropTypes{
    onClose: ()=>void
    basketProducts: IProduct[]
    setProducts: (item: IProduct)=>void
    changeBasketProductCount: (index: number, newCount:number)=>void
    deleteProductInBasket: (index:number)=>void
}

export const BasketModal: FC<PropTypes>=({onClose, basketProducts, setProducts, changeBasketProductCount, deleteProductInBasket}) => {
    const [disabledComplite, setDisabledComplite] = useState(true)
    let c = 0
    useEffect(()=>{
        if (basketProducts.length !== 0){
            setDisabledComplite(false)
        }else{
            setDisabledComplite(true)
        }
        
        for (let i of basketProducts){
            if (i.count !== undefined){
                c += i.price * i.count
            }
        }
        setTotalAmount(c)
    }, [basketProducts.length])
    
    const [totalAmount, setTotalAmount] = useState(c)
    function complite(){
        onClose()
    }

    function updateTotalAmount(){
        c = 0
        for (let i of basketProducts){
            if (i.count !== undefined){
                c += i.price * i.count
            }
        }
        setTotalAmount(c)
    }

    
    return (
    <div id={st["basket-modal"]}>
        <div id={st["basket-modal-title"]}>Корзина</div>
        <div id={st["basket-products"]}>
            {basketProducts.map((product, index) => <BasketProductCard 
                key={index} 
                index={index}
                product={product} 
                setProducts={(item: IProduct)=>setProducts(item)}
                updateTotalAmount={updateTotalAmount}
                changeBasketProductCount={(index:number, newCount:number)=>changeBasketProductCount(index, newCount)}
                deleteProductInBasket={(index:number)=>{deleteProductInBasket(index)}}
                ></BasketProductCard> )}
            {basketProducts.length === 0 && <div id={st["empty"]}>Пусто</div>}
        </div>
        <div id={st["basket-actions"]}>
            <div className={st["total-amount"]}>Общая сумма: <label className={st["total-amount-number"]}>{totalAmount} ₽</label></div>
            <button className={st["button-complite"]} onClick={complite} disabled={disabledComplite}>Перейти к оформлению</button>
        </div>
    </div>
    );
}