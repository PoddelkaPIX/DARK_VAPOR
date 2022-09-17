import { FC, useState } from "react";
import { Link } from "react-router-dom"
import logo from "../../../images/logo.png";
import logo_title from "../../../images/logo_title.png"
import {IProduct} from "../../../App"

import st from "./Header.module.scss"
import { Modal } from "../Modal/Modal";
import { BasketModal } from "../../../modals/BasketModal/BasketModal";

interface PropTypes{
    authorized: boolean
    basketProducts: IProduct[]
    setProducts: (item: IProduct)=>void
    changeBasketProductCount: (index:number, newCount:number)=>void
    deleteProductInBasket: (index:number)=>void
}
export const Header:FC<PropTypes> = ({authorized, basketProducts, setProducts, changeBasketProductCount, deleteProductInBasket}) => {
    const [basket, setBasket] = useState(false)
    return (
        <header>
            <Link id={st["logo"]} to="/">
                <img id={st["logo-img"]} src={logo} alt="Логотип" />
                <img id={st["logo-title"]} src={logo_title} alt="Название" />
            </Link>
            {authorized &&  <Link to={"/admin"} id={st["admin"]}><i className="fa-solid fa-screwdriver-wrench"></i></Link>}
            <div id={st["basket"]} onClick={() => setBasket(!basket)}><i className="fa-sharp fa-solid fa-cart-shopping" ></i> {basketProducts.length > 0 && <div id={st["product-count"]}>{basketProducts.length}</div>}</div>
            {basket && <Modal closingBackground={true} onClose={()=>setBasket(false)}>
                    <BasketModal 
                    basketProducts={basketProducts} 
                    onClose={()=>setBasket(false)} 
                    setProducts={(item: IProduct)=>setProducts(item)}
                    changeBasketProductCount={(index:number, newCount:number)=>changeBasketProductCount(index, newCount)}
                    deleteProductInBasket={(index:number)=>{deleteProductInBasket(index)}}
                    ></BasketModal>
                </Modal>}
        </header>
    )
}