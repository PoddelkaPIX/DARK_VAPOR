import { FC, useEffect, useReducer, useState } from "react"
import st from "./Orders.module.scss"
import { OrderCard } from "../../components/cards/OrderCard/OrderCard"
import config from "../../config.json"
import { IOrder } from "../../interfaces"
interface PropTypes {
    authorized: boolean
}

export const Orders: FC<PropTypes>= ({authorized}) => {
    const [orders, setOrders] = useState<IOrder[]>([])
    const [update , forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(()=>{
        fetch(config.backend+ "/orders").then(res=>res.json()).then((result)=>setOrders(result)) 
    }, [update, forceUpdate])
    return (
        <main>
            <h1>Заказы</h1>
            <div id={st["order-list"]}>
                {orders.map((order, index)=>
                    <OrderCard key={index} order={order} forceUpdate={forceUpdate} />
                )}
            </div>
        </main>
    )
}