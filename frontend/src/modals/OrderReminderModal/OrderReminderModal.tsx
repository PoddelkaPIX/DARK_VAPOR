import { FC, useEffect, useState } from "react"
import { IOrder } from "../../structs"
import st from "./OrderReminderModal.module.scss"
interface PropTypes{
    onClose: ()=>void
    order: IOrder
}

export const OrderReminderModal: FC<PropTypes>=({onClose, order}) => {
    const [disabledConfirm, setDisabledConfirm] = useState(true)
    const [blockingTime, setBlockingTime] = useState(10)
    let timer: string | number | NodeJS.Timeout | undefined
    let x = 15
    function countdown(){  // функция обратного отсчета
        console.log(x);
        x--
        setBlockingTime(x)
        if (x<=0){
            clearTimeout(timer);
            setDisabledConfirm(false)
        }
        else {
            timer = setTimeout(countdown, 1000);
        }
    }
    useEffect(()=>{
        console.log(order);
        
        countdown()
    }, [])

    return (
        <div id={st["order-reminder-modal"]}>
            <div id={st["message"]}>
                <h3>Спасибо за заказ!</h3>
                <p>Сумма перевода: <b>{order.cost_of_delivery + order.cost_of_products} ₽</b></p>
                <p>Перевод по номеру телефона: <b>89197665190</b></p>
                <p>Андрей Алексеевич Ч.</p>
                <p>Сбербанк</p>
                <hr />
                <p><strong>!!!В поле комментарий ни чего не указывать!!!</strong></p>
                <hr />
                <p>Переведите сумму на указаный номер и ждите когда с вами свяжутся.</p>
                <p>Скриншот с доказательством перевода, отправте в нашу группу <a href="https://vk.com/darkvapor">https://vk.com/darkvapor</a></p>
               
            </div>
            <div>
                <button id={st["confirmed"]} onClick={()=>{onClose(); window.location.replace("/")}} disabled={disabledConfirm}>Понял. Больше не показывать. {blockingTime !== 0 && <label>({blockingTime})</label>}</button>
            </div>
        </div>
    )
}