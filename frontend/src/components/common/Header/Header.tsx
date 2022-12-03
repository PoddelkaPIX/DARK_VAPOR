import { FC, useState } from "react";
import { Link } from "react-router-dom"
import logo from "../../../images/logo.png";
import logo_title from "../../../images/logo_title.png"

import st from "./Header.module.scss"
import { Modal } from "../Modal/Modal";
import { BasketModal } from "../../../modals/BasketModal/BasketModal";
import { MakingOrderModal } from "../../../modals/MakingOrderModal/MakingOrderModal";
import { OrganizationInformationModal } from "../../../modals/OrganizationInformationModal/OrganizationInformationModal";
import { IBasket, IOrder, IProduct } from "../../../interfaces";
import { OrderReminderModal } from "../../../modals/OrderReminderModal/OrderReminderModal";

interface PropTypes{
    authorized: boolean
    basket: IBasket
    setProducts: (item: IProduct)=>void
    changeBasketProductCount: (index:number, newCount:number)=>void
    deleteProductInBasket: (index:number)=>void
}
export const Header:FC<PropTypes> = ({authorized, basket, setProducts, changeBasketProductCount, deleteProductInBasket}) => {
    const [openBasket, setOpenBasket] = useState(false)
    const [openInformation, setOpenInformation] = useState(false)
    const [makingOrderModal, setMakingOrderModal] = useState(false)
    const [orderReminder, setOrderReminder] = useState(false)
    const [order, setOrder] = useState<IOrder>({
        last_name: "",
        first_name:  "",
        patronymic:  "",
        telephone:  "",
        feedback_URL:  "",
        message:  "",
        country:  "",
        country_code: "",
        region:  "",
        location:  "",
        delivery_point:  "",
        delivery_point_code:  "",
        products: basket.products,
        cost_of_products: basket.total_amount,
        cost_of_delivery: 0,
        delivery: "СДЭК",
        weight: 0,
        sender_name: "",
        sender_phone_number: ""
    })
    if (makingOrderModal || openInformation || makingOrderModal){
        document.body.style.overflowY = "hidden"
    }else{
        document.body.style.overflowY = "unset"
    }
    return (
        <header>
            <i className="fa-solid fa-notebook"></i>
            <Link id={st["logo"]} to="/">
                <img id={st["logo-img"]} src={logo} alt="Логотип" />
                <img id={st["logo-title"]} src={logo_title} alt="Название" />
            </Link>
            <div id={st["actions"]}>
                {authorized &&  <div onClick={()=>setOpenInformation(true)} id={st["organization"]}><i  className="fa-solid fa-circle-info"></i></div>}
                {authorized &&  <Link to={"/orders"} id={st["orders"]}><i className="fa-solid fa-book"></i></Link>}
                {authorized &&  <Link to={"/admin"} id={st["admin"]}><i className="fa-solid fa-screwdriver-wrench"></i></Link>}
                <div id={st["basket"]} onClick={() => setOpenBasket(true)}><i className="fa-sharp fa-solid fa-cart-shopping" ></i> {basket.products.length > 0 && <div id={st["product-count"]}>{basket.products.length}</div>}</div>
            </div>
            {openBasket && <Modal onClose={()=>setOpenBasket(false)} closingBackground={true}> 
                    <BasketModal 
                        setMakingOrderModal={()=>setMakingOrderModal(true)}
                        basket={basket}
                        onClose={()=>setOpenBasket(false)} 
                        setProducts={(item: IProduct)=>setProducts(item)}
                        changeBasketProductCount={(index:number, newCount:number)=>changeBasketProductCount(index, newCount)}
                        deleteProductInBasket={(index:number)=>{deleteProductInBasket(index)}}
                    ></BasketModal>
                </Modal>}
            {openInformation && 
                <Modal onClose={()=>setOpenInformation(false)}>
                    <OrganizationInformationModal onClose={()=>setOpenInformation(false)}/>
                </Modal>}
            {makingOrderModal && 
                <Modal closingBackground={true} onClose={()=>setMakingOrderModal(false)}>
                    <MakingOrderModal onClose={()=>setMakingOrderModal(false)} order={order} setOrder={(order: IOrder)=>setOrder(order)} setOrderReminder={(bool: boolean)=>setOrderReminder(bool)} basket={basket}/>
                </Modal>}
            {orderReminder && 
                <Modal onClose={()=>setOrderReminder(false)}>
                    <OrderReminderModal order={order} onClose={()=>setOrderReminder(false)}/>
                </Modal>}
            {orderReminder && 
            <Modal onClose={()=>setOrderReminder(false)}>
                <OrderReminderModal order={order} onClose={()=>setOrderReminder(false)}/>
            </Modal>}
        </header>
    )
}