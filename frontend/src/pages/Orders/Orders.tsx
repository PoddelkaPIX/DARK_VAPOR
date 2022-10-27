import { FC, useEffect, useState } from "react"
import st from "./Orders.module.scss"
import { OrderCard } from "../../components/cards/OrderCard/OrderCard"
import config from "../../config.json"
import { IOrder } from "../../structs"
interface PropTypes {
    authorized: boolean
}

export const Orders: FC<PropTypes>= ({authorized}) => {
    const [orders, setOrders] = useState<IOrder[]>([])
    const [flagUpdate, setFlagUpdate ] = useState(1)
    useEffect(()=>{
        fetch(config.backend.host + config.backend.port + "/orders").then(res=>res.json()).then((result)=>setOrders(result)) 
    }, [flagUpdate])
    return (
        <main>
            <h1>Заказы</h1>
            <div id={st["order-list"]}>
                {orders.map((order, index)=>
                        <OrderCard key={index} order={order} flagUpdate={()=>setFlagUpdate(flagUpdate*-1)} />
                )}
            </div>
        </main>
    )
}