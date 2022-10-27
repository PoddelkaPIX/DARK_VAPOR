import { FC, useEffect, useState } from "react";
import { BasketProductCard } from "../../components/cards/BasketProductCard/BasketProductCard";
import { IBasket, IProduct } from "../../structs";
import st from "./BasketModal.module.scss"

interface PropTypes{
    onClose: ()=>void
    setMakingOrderModal: ()=>void
    basket: IBasket
    setProducts: (item: IProduct)=>void
    changeBasketProductCount: (index: number, newCount:number)=>void
    deleteProductInBasket: (index:number)=>void
}

export const BasketModal: FC<PropTypes>=({onClose, basket, setMakingOrderModal, changeBasketProductCount, deleteProductInBasket}) => {
    const [disabledComplite, setDisabledComplite] = useState(true)
    let c = 0

    useEffect(()=>{
        if (basket.products.length !== 0){
            setDisabledComplite(false)
        }else{
            setDisabledComplite(true)
        }
    })
    
   
    function complite(){
        setMakingOrderModal()
        onClose()
    }

    return (
    <div id={st["basket-modal"]}>
        <div id={st["basket-modal-title"]}>Корзина</div>
        <div id={st["basket-products"]}>
            {basket.products.map((product, index) => <BasketProductCard 
                key={index} 
                index={index}
                product={product} 
                changeBasketProductCount={(index:number, newCount:number)=>changeBasketProductCount(index, newCount)}
                deleteProductInBasket={(index:number)=>{deleteProductInBasket(index)}}
                ></BasketProductCard> )}
            {basket.products.length === 0 && <div id={st["empty"]}>Пусто</div>}
        </div>
        <div id={st["basket-actions"]}>
            <div className={st["total-amount"]}>Стоимость товаров: <label className={st["total-amount-number"]}>{basket.total_amount} ₽</label></div>
            <button className={st["button-complite"]} onClick={complite} disabled={disabledComplite}>Перейти к оформлению</button>
        </div>
    </div>
    );
}