import { FC } from "react";
import { IOrder } from "../../interfaces";
import st from "./OrderInformationModal.module.scss"
interface PropTypes{
    onClose: ()=>void
    order: IOrder
}

export const OrderInformationModal: FC<PropTypes> = ({onClose, order})=>{
    document.body.style.overflowY = "hidden"

    return (
        <div id={st["order-information-modal"]} >
            <h2><strong>Информация</strong></h2>
            <table id={st["order-table"]}>
                <tbody>
                    <tr><td>ФИО</td><td>{order.last_name} {order.first_name} {order.patronymic}</td></tr>
                    <tr><td>Телефон</td><td>{order.telephone}</td></tr>
                    <tr><td>Страна</td><td>{order.country}</td></tr>
                    <tr><td>Регион</td><td>{order.region}</td></tr>
                    <tr><td>Город</td><td>{order.location}</td></tr>
                    <tr><td>Соц. сеть</td><td>{order.feedback_URL}</td></tr>
                    {order.message !== "" && <tr><td>Сообщение</td><td>{order.message}</td></tr>}
                    <tr><td>Почтовая служба</td><td>{order.delivery}</td></tr>
                    <tr><td>Пункт доставки</td><td>{order.delivery_point}</td></tr>
                    {order.uuid_sdek && <tr><td>uuid заказа: </td><td>{order.uuid_sdek}</td></tr>}
                    {order.number_sdek && <tr><td>Номер заказа: </td><td>{order.number_sdek}</td></tr>}

                </tbody>
            </table>
            <table id={st["order-products-table"]}>
                <thead><tr><td>Название</td><td>Цена</td><td>Кол-во</td><td>Парам.</td></tr></thead>
                <tbody>
                    {order.products?.map((product, index)=><tr key={index}>
                        <td>{product.title_product}</td><td>{product.price} ₽</td><td>{product.count} шт.</td>
                        <td>
                            {product.parameters?.map((parameter, index)=>
                            <div key={index} className={st["parameter"]}>
                                <div>{parameter.title_parameter}</div>
                                    {parameter?.values.map((value, index)=><div>({value})</div>)}
                            </div>)}
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <div>Служба доставки: <strong>{order.delivery}</strong> </div>
            <div>Стоимость товаров: {order.cost_of_products} ₽</div>
            <div>Стоимость доставки: {order.cost_of_delivery} ₽</div>
            <div>Общая стоимость: {order.cost_of_products + order.cost_of_delivery} ₽</div>
            <button onClick={onClose}>Закрыть</button>
        </div>
    )
}