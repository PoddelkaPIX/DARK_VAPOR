import axios from "axios";
import { FC, useEffect, useReducer, useState } from "react";
import { Modal } from "../../components/common/Modal/Modal";
import st from "./MakingOrderModal.module.scss"
import config from "../../config.json"
import { IBasket, IDeliverypoint, IOrder} from "../../interfaces";
import { SdekOrderForm } from "../../components/forms/SdekOrderForm/SdekOrderForm";
import { DaDataAddress, DaDataSuggestion } from "react-dadata";
import { PochtaOrderForm } from "../../components/forms/PochtaOrderForm/PochtaOrderForm";
interface PropTypes{
    closingBackground: boolean
    onClose: ()=>void
    basket: IBasket
    setOrderReminder: (bool: boolean)=>void
    order: IOrder
    setOrder: (order:IOrder)=>void
}

export const MakingOrderModal: FC<PropTypes> = ({onClose, closingBackground, basket, setOrderReminder, order, setOrder})=>{
    const [disabledComplite, setDisabledComplite] = useState(true)

    const [deliverypoints, setDeliverypoints] = useState<IDeliverypoint[]>([])
    const [locationData, setLocalityData] = useState<DaDataSuggestion<DaDataAddress>>();
    const [warning, setWarning] = useState("");

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    let weight = 0
    for (let i=0; i < Math.ceil(basket.products.length / 4); i++){
        weight += 500
    }
    order.weight = weight
    order.cost_of_products = basket.total_amount
    order.products = basket.products
    setOrder(order)

    
    function ValidPhone(telephone: string) {
        // eslint-disable-next-line no-useless-escape
        var re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
        var valid = re.test(telephone);
    
        if (valid) {
            setWarning("")
        }else{
            setWarning("Не верно введён номер телефона!")
        }
    }  

    function handlerSetOrder(newOrder: IOrder){
        forceUpdate()
        setOrder(newOrder)

    }
    
    function complite(){
        let url = config.backend + "/addOrder"
      
        axios({
            method: 'post',
            url: url,
            data: order,
            headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
            setOrderReminder(true)
            onClose()
        })
        .catch(function (error) {
            alert("Какие-то проблемы. Обратитесь за помощью в нашу группу https://vk.com/darkvapor")
        });
    }

    useEffect(()=>{
        if ( locationData !== undefined && locationData.data.city_with_type !== null){
            if (locationData.data.city_with_type !== null && locationData.data.city_with_type !== ""){
                order.location = locationData.data.city_with_type
            }
            order.country = locationData.data.country
            order.country_code = locationData.data.country_iso_code
            order.region = locationData.data.region_with_type
            console.log("order", order);
            
            setOrder(order)
        }
        if ( warning === "" && order.cost_of_delivery !== 0 && order.last_name !== "" &&  
            order.first_name !== "" &&  order.patronymic !== "" &&  order.telephone !== ""  &&  
            order.location !== "" &&  order.delivery_point_code !== "" &&  order.feedback_URL !== "" &&
            order.country !== "" && order.region !== ""){
            setDisabledComplite(false) 
        }else{
            setDisabledComplite(true)
        }
    })
    return (
        <Modal onClose={onClose} closingBackground={closingBackground} cross={true}>
            <div id={st["making-order-modal"]} >
                <div id={st["order-information"]}>
                <h2><strong>Информация о товарах</strong></h2>
                    <table id={st["products-table"]}>
                        <thead><tr><td>Название</td><td>Цена</td><td>Кол-во</td><td>Парам.</td></tr></thead>
                        <tbody>
                            {basket.products?.map((product, index)=><tr key={index}>
                                <td>{product.title_product}</td><td>{product.price} ₽</td><td>{product.count} шт.</td>
                                <td>
                                    {product.parameters?.map((parameter, index)=>
                                    <div key={index} className={st["parameter"]}>
                                        <div>{parameter.title_parameter}</div>
                                        {parameter?.values.map((value, index)=><div key={index}>| <strong>{value}</strong> |</div>)}
                                    </div>)}
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                    <div id={st["total-amount"]} ><b>Общая стоимость: </b>{order.cost_of_products} + {order.cost_of_delivery} = <strong>{order.cost_of_delivery + order.cost_of_products} ₽</strong></div>
                </div>
                <div id={st["making-order"]}>
                    <div id={st["making-order-forma"]}>
                        <h2><strong>Оформление заказа</strong></h2>
                        <label>Фамилия  <input type="text" onChange={(e)=>{order.last_name = e.target.value ; setOrder(order); forceUpdate()}} placeholder="Фамилия"/></label> 
                        <label>Имя <input type="text" onChange={(e)=>{order.first_name = e.target.value ; setOrder(order); forceUpdate()}} placeholder="Имя"/></label> 
                        <label>Отчество <input type="text" onChange={(e)=>{order.patronymic = e.target.value ; setOrder(order); forceUpdate()}} placeholder="Отчество"/></label> 
                        <label>Номер телефона <input type="tel" onChange={(e)=>{ValidPhone(e.target.value); order.telephone = e.target.value ; setOrder(order); forceUpdate()}} placeholder="Номер телефона"/></label> 
                        <label>VK или TELEGRAM <input type="text" onChange={(e)=>{order.feedback_URL = e.target.value ; setOrder(order); forceUpdate()}} placeholder="VK или TELEGRAM"/></label> 
                        <label>Сообщение <br/>(Не обязательно)<textarea onChange={(e)=>{order.message = e.target.value ; setOrder(order); forceUpdate()}} maxLength={1255}></textarea></label> 
                    </div>
                    <div id={st["choice-of-delivery"]}>
                        <h2><strong>Служба доставки</strong></h2>
                        <select id={st["delivery-select"]} value={order.delivery} onChange={(e)=>{order.delivery = e.target.value; setOrder(order); forceUpdate()}}>
                            <option value="СДЭК">СДЭК</option>
                            {/* <option value="ПОЧТА РОССИИ">ПОЧТА РОССИИ</option> */}
                        </select>
                        {order.delivery === "СДЭК" && 
                            <SdekOrderForm order={order} setOrder={handlerSetOrder} setLocalityData={(data)=>setLocalityData(data)} locationData={locationData} modalForceUpdate={forceUpdate} deliverypoints={deliverypoints} setDeliverypoints={(delivery_points: IDeliverypoint[])=>setDeliverypoints(delivery_points)}/>
                        }
                        {/* {order.delivery === "ПОЧТА РОССИИ" && 
                            <PochtaOrderForm order={order} setOrder={handlerSetOrder} setLocalityData={(data)=>setLocalityData(data)} locationData={locationData} modalForceUpdate={forceUpdate} deliverypoints={deliverypoints} setDeliverypoints={(delivery_points: IDeliverypoint[])=>setDeliverypoints(delivery_points)}/>
                        } */}
                        {(order.cost_of_delivery !== undefined || order.cost_of_delivery !== 0) && <div id={st["delivery-amount"]} ><b>Стоимость доставки: </b> {order.cost_of_delivery} ₽</div>}
                    </div>
                    <button onClick={complite} disabled={disabledComplite} id={st["confirm-button"]}>Подтвердить заказ на {order.cost_of_products + order.cost_of_delivery} ₽</button>
                </div>
            </div>
        </Modal>
    )
}