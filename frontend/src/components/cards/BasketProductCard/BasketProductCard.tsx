import { FC } from "react";
import st from "./BasketProductCard.module.scss"
import { useState } from "react";
import { IProduct } from "../../../App";

interface PropTypes{
    product: IProduct
    index: number
    updateTotalAmount: ()=>void
    setProducts: (item: IProduct)=>void
    changeBasketProductCount: (index: number, newCount:number)=>void
    deleteProductInBasket: (index:number)=>void
}

export const BasketProductCard: FC<PropTypes>=({product, index, setProducts, updateTotalAmount, changeBasketProductCount, deleteProductInBasket}) => {
    const [count, setCount] = useState(product.count)
    function updateCount(coun: number){
        if (count+coun>=1 && count+coun<=20){
            setCount(count+coun)
            changeBasketProductCount(index, count+coun)
            updateTotalAmount()
        } 
    }
    function handleDeleteProduct(){
        deleteProductInBasket(index)
        updateTotalAmount()
    }
    
    return (
        <div className={st["basket-product-card"]} key={product.title}>
                <div className={st["index"]}>{index + 1}</div>
                <div className={st["basket-product-title"]}>{product.title}</div>
                <div className={st["basket-product-price"]}>{product.price} ₽</div>
                <div className={st["product-number"]}>
                    <button onClick={()=>updateCount(-1)}>-</button>
                    <input type="number" value={product.count} className={st["quantity"]} disabled={true}/>
                    <button onClick={()=>updateCount(1)}>+</button>
                </div>
                <div className={st["buttons"]}>
                    <div className={st["button-pencil"]} ><i className="fa-solid fa-pencil"></i></div>
                    <div className={st["button-trash"]} onClick={handleDeleteProduct}><i className="fa-solid fa-trash"></i></div>
                </div>
            </div>
    )
}