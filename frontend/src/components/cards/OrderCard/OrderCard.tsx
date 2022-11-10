import { FC } from "react";
import st from "./OrderCard.module.scss"
import { useState } from "react";
import { Modal } from "../../common/Modal/Modal";
import { OrderInformationModal } from "../../../modals/OrderInformationModal/OrderInformationModal";
import axios from "axios";
import config from "../../../config.json"
import { IInformation, IOrder } from "../../../interfaces";
import { ConfirmDialog } from "../../common/ConfirmDialog/ConfirmDialog";
import { CreatingReceiptModal } from "../../../modals/CreatingReceiptModal/CreatingReceiptModal";

interface PropTypes{
    order: IOrder
    flagUpdate: ()=>void
}

export const OrderCard: FC<PropTypes>=({order, flagUpdate}) => {
    const [showInformationModal, setShowInformationModal] = useState(false);
    const [confirmDialogDelete, setConfirmDialogDelete] = useState(false);
    const [confirmDialogAccept, setConfirmDialogAccept] = useState(false);

    const [confirmed, setConfirmed] = useState(order.confirmed);

    if (showInformationModal){
        document.body.style.overflowY = "hidden"
    }else{
        document.body.style.overflowY = "unset"
    }
    function deleteOrder(){
        let url = config.backend + "/deleteOrder"

        let body = {
            "order_id": order.order_id,
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
        })
    }
    function confirme(){
        fetch(config.backend + "/getInformation").then(res=>res.json()).then((result)=>{
            let url = config.backend + "/orderConfirmed"
            console.log("ddd", result.data);
            
            let body = {
                "order": order,
                "adminInformation": result.data,
            }
            axios({
                method: 'post',
                url: url,
                data: body,
                headers: { "Content-Type": "application/json" },
            })
            .then(function (response) {
                console.log(response);
                setConfirmed(response.data.confirmed)
                order.uuid = response.data.uuid
            })
            .catch(function (error) {
                console.log(error);
            })
        })
    }
    function printReceiptSdek(){
        fetch(config.backend + "/createReceiptSdek/"+order.uuid)
    }
    return (
        <div className={st["order-card"]} id={st[confirmed ? confirmed.toString() : "false"]}>
            <div id={st["one-row"]}>
                <div className={st["order-card-title"]}>{order.last_name} {order.first_name} {order.patronymic}</div>
                <div className={st["order-card-price"]}><div>Товаров: {order.products.length} шт.</div></div>
                <div className={st["order-card-description"]}>
                    <div>{order.location}</div>
                </div>
                <div id={st["buttons"]}>
                    <button className={st["button-edit"]} onClick={()=>setShowInformationModal(true)}><i className="fa-solid fa-eye"></i></button>
                    <button className={st["button-trash"]} onClick={()=>setConfirmDialogDelete(true)}><i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
            <div id={st["two-row"]}>
                <div id={st["date-time"]}>#{order.order_id} - {order.date}</div>
                {!confirmed && <button onClick={()=>setConfirmDialogAccept(true)} id={st["confirm-button"]}>Подтвердить заказ</button>}
            </div>
            {showInformationModal && 
                <Modal closingBackground={true} onClose={() => setShowInformationModal(false)}>
                    <OrderInformationModal onClose={()=>setShowInformationModal(false)} order={order}/>
                </Modal>}
            {confirmDialogDelete && <ConfirmDialog onClose={()=>setConfirmDialogDelete(false)} question="Удалить заказ?" confirme={deleteOrder}/>}
            {confirmDialogAccept && <ConfirmDialog onClose={()=>setConfirmDialogAccept(false)} question="Подтвердить заказ?" confirme={confirme}/>}
        </div>)
}