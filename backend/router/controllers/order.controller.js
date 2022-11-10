const {orderRegistration} = require('./sdek.controller')
const config = require('../../config.json');
const fetch = require("cross-fetch")
module.exports.addOrder= async function (client, data){
    const date = new Date().toLocaleString()
    let telegramMessage = ""
    let fields  = [
        '<b>ФИО</b>: ' + data.last_name + " " + data.first_name + " " + data.patronymic,
        '<b>Телефон</b>: ' + data.telephone,
        '<b>Соц. сеть</b>: ' + data.feedback_URL,
        '<b>Сообщение</b>: ' + data.message,
        '<b>Служба доставки</b>: ' + "<strong>" + data.delivery + "</strong>",
        '<b>Страна</b>: ' + data.country,
        '<b>Регион</b>: ' + data.region,
        '<b>Город</b>: ' + data.location,
        '<b>Пункт выдачи</b>: ' + data.delivery_point,
        '<b>Стоимость товаров</b>: ' + "<strong>" + data.cost_of_products + " ₽" + "</strong>",
        '<b>Стоимость доставки</b>: ' + "<strong>" + data.cost_of_delivery + " ₽" + "</strong>",
        '<b>Общая сумма</b>: ' + "<strong>" + String(Number(data.cost_of_products)+Number(data.cost_of_delivery)) + " ₽" + "</strong>",
        '<b>Товары</b>: ',
    ]
    let order_id =await client.query(`INSERT 
                        INTO "order"(
                            last_name, 
                            first_name,
                            patronymic,
                            telephone,
                            country,
                            country_code,
                            region,
                            location,
                            delivery_point,
                            delivery_point_code,
                            "feedback_URL",
                            message,
                            cost_of_products,
                            cost_of_delivery,
                            delivery,
                            weight,
                            date)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING order_id;`, [
                            data.last_name, 
                            data.first_name,
                            data.patronymic,
                            data.telephone,
                            data.country,
                            data.country_code,
                            data.region,
                            data.location,
                            data.delivery_point,
                            data.delivery_point_code,
                            data.feedback_URL,
                            data.message,
                            data.cost_of_products,
                            data.cost_of_delivery,
                            data.delivery,
                            data.weight,
                            date
                        ])
    order_id = order_id.rows[0].order_id
    let index = 0
    for (let product of data.products){
        index += 1
        fields.push("   "+ index +" - " + product.title_product + " | " + product.count+ " шт."+ " |")
        let order_product_id = await client.query(`INSERT 
                        INTO order_product(
                            product_id, 
                            order_id,
                            count)
                        VALUES ($1, $2, $3) RETURNING order_product_id;`, [
                            product.product_id, 
                            order_id,
                            product.count
                        ]
        )
        order_product_id = order_product_id.rows[0].order_product_id
        for (let param of product.parameters){
            await client.query(`INSERT 
                        INTO order_product_parameter_values(
                            order_product_parameter_value, 
                            title_parameter,
                            order_product_id,
                            order_id,
                            "group")
                        VALUES ($1, $2, $3, $4, $5);`, [
                            param.values[0],
                            param.title_parameter, 
                            order_product_id,
                            order_id,
                            param.group
                        ]
            )
            let values = ""
            param.values.forEach(value=>{
                values +=  value + " "
            })
            fields.push("           "+param.title_parameter + " ( " + values + ")")
        }
    }
    fields.forEach(field => {
        telegramMessage += field + '%0A'
    });
    try{
        fetch(`https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat}&parse_mode=html&text=${telegramMessage}`)
    }catch(err){
        console.log(err);
    }
}

module.exports.getOrders = async function (client){
    const data = []
    const orders = await client.query('SELECT * FROM "order" order by (confirmed is false) desc, "order_id" DESC')
    for (let i of orders.rows){
        const result = await client.query(`SELECT 
        product.product_id, 
        product.title_product, 
        product.price, 
        product.description, 
        product.available,
        order_product.count,
        order_product.order_product_id,
        type.title_type,
        type.type_id,
        category.title_category,
        category.category_id
        FROM product
        JOIN order_product ON product.product_id = order_product.product_id
        JOIN type ON product.type_id = type.type_id
        JOIN category ON category.category_id = type.category_id
        WHERE order_product.order_id = $1 `, [i.order_id])
        for (let product of result.rows){
            let a = []
            const parameters = await client.query('SELECT * FROM order_product_parameter_values WHERE order_product_id = $1 ', [product.order_product_id] )
            for (let param of parameters.rows){
                a.push(
                    {
                        "title_parameter": param.title_parameter,
                        "group": param.group,
                        "values": [param.order_product_parameter_value]
                    }
                )
            }
            product["parameters"] = a
        }
        data.push({
            "order_id": i.order_id, 
            "last_name": i.last_name, 
            "first_name": i.first_name, 
            "patronymic": i.patronymic, 
            "telephone": i.telephone,
            "date": i.date, 
            "confirmed": i.confirmed,
            "country": i.country,
            "country_code": i.country_code,
            "region": i.region,
            "location": i.location,
            "delivery_point": i.delivery_point,
            "delivery_point_code": i.delivery_point_code,
            "feedback_URL": i.feedback_URL,
            "products": result.rows,
            "message": i.message,
            "cost_of_delivery": i.cost_of_delivery,
            "cost_of_products": i.cost_of_products,
            "delivery": i.delivery,
            "weight": i.weight,
            "uuid": i.uuid
        })
    }
    return data
} 

module.exports.orderConfirmed = async function (tokken, client, data){
    const order_info = await orderRegistration(tokken, data)
    if (order_info.uuid != null && order_info.cdek_number != null){
        fetch(`https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat}&parse_mode=html&text=${"Заказ под номером " +  data.order.order_id +" подтверждён%0Auuid: " + order_info.uuid+"%0AНомер квитанции: " + order_info.cdek_number}`)
        await client.query(`UPDATE "order" SET
            confirmed = true,
            uuid = $1
            WHERE order_id = $2;`, [
            order_info.uuid, 
            data.order.order_id,
            ]
        )   
        return {
            "confirmed": true,
            "uuid": order_info.uuid
        }
    }else{
        return {
            "confirmed": false,
            "uuid": null
        }
    }
}

module.exports.deleteOrder = async function (client, productId){
    await client.query(`DELETE FROM "order"
    WHERE order_id=$1;`, [productId])
    await client.query(`DELETE FROM order_product
    WHERE order_id=$1;`, [productId])
    await client.query(`DELETE FROM order_product_parameter_values
    WHERE order_id=$1;`, [productId])
}