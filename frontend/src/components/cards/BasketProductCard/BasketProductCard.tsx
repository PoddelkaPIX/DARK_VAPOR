import { FC } from "react";
import st from "./BasketProductCard.module.scss"
import { useState } from "react";
import { IProduct } from "../../../structs";

interface PropTypes{
    product: IProduct
    index: number
    changeBasketProductCount: (index: number, newCount:number)=>void
    deleteProductInBasket: (index:number)=>void
}

export const BasketProductCard: FC<PropTypes>=({product, index, changeBasketProductCount, deleteProductInBasket}) => {
    const [count, setCount] = useState(product.count)
    const [information, setInformation] = useState(false)

    function updateCount(coun: number){
        if (count+coun>=1 && count+coun<=255){
            setCount(count+coun)
            changeBasketProductCount(index, count+coun)
        } 
    }
    function handleDeleteProduct(){
        deleteProductInBasket(index)
    }
    
    return (
        <div className={st["basket-product-card"]} key={product.title_product}>
            <div className={st["index"]}>{index + 1}</div>
            <div className={st["basket-product-title"]}>{product.title_product}</div>
            <div className={st["basket-product-price"]}>{product.price} ₽</div>
            <div className={st["product-number"]}>
                <button onClick={()=>updateCount(-1)}>-</button>
                <input type="number" value={product.count} className={st["quantity"]} disabled={true}/>
                <button onClick={()=>updateCount(1)}>+</button>
            </div>
            <div id={st["buttons"]}>
                <div id={st["info"]} onMouseOver={()=>{setInformation(true)}} onMouseOut={()=>{setInformation(false)}}><i className="fa-solid fa-circle-info"></i></div>
                <div id={st["button-trash"]} onClick={handleDeleteProduct}><i className="fa-solid fa-trash"></i></div>
            </div>
            {information && <div id={st["information"]}>
                {product.parameters.length === 0 && <div>Параметров нет</div>}
                {product.parameters.map(pram=><div>{pram.title_parameter}: {pram.values}</div>)}
            </div>}
        </div>
    )
}