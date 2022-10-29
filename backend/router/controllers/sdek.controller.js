const axios = require("axios")
const config = require("../../config.json")
// module.exports.getRegionsSdek = async function(tokken){
//     url = config.sdek.domen + "/v2/location/regions?country_codes=RU"
//     let data = await axios({
//         method: 'get',
//         url: url,
//         headers: { "Authorization": "Bearer "+tokken },
//     })
//     .then(function (response) {
//         return response.data
//     })
//     .catch(function (error) {
//         return error;
//     });
//     return data
// }

module.exports.getCityesSdek = async function(tokken, regionCode){
    url = config.sdek.domen + "/v2/location/cities/?region_code="+regionCode
    let data = await axios({
        method: 'get',
        url: url,
        headers: { "Authorization": "Bearer "+tokken },
    })
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        return error;
    });
    return data
}
async function getCitySdek(tokken, fias_id){
    url = config.sdek.domen + "/v2/location/cities/?fias_guid="+fias_id
    let data = await axios({
        method: 'get',
        url: url,
        headers: { "Authorization": "Bearer "+tokken },
    })
    .then(function (response) {
        return response.data[0]
    })
    .catch(function (error) {
        return error;
    });
    return data
}

module.exports.getDeliverypointsSdek = async function(city_fias_id, tokken){
    url = config.sdek.domen + "/v2/deliverypoints?fias_guid="+city_fias_id+"&is_handout=true&is_reception=true"
    let data = await axios({
        method: 'get',
        url: url,
        headers: { "Authorization": "Bearer "+tokken },
    })
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        return error;
    });

    return data
}

module.exports.calculateDeliverySdek = async function(tokken, dataJSON){
    const from_location_code = await getCitySdek(tokken, dataJSON.from_location_fias_id) 
    const to_location_code = await getCitySdek(tokken, dataJSON.to_location_fias_id) 
    body = {
        "currency": "1",
        "tariff_code": Number(dataJSON.tariff_code),
        "from_location": {
            "code": from_location_code.code
        },
        "to_location": {
            "code": to_location_code.code
        },
        "packages": [
            {
                "weight": 500,
            }
        ]
    }
    url = config.sdek.domen + "/v2/calculator/tariff"
    let data = await axios({
        method: 'post',
        url: url,
        headers: { "Authorization": "Bearer "+tokken },
        data: body
    })
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        return error;
    });

    return data
}
module.exports.orderRegistration = async function(tokken, dataJSON){
    console.log("dataJSON", dataJSON);
    sdekPrducts = []
    for (let product of dataJSON.order.products){
        sdekPrducts.push(
            {
                "ware_key" : product.product_id,
                "payment" : {"value" : 0},
                "name" : product.title_product,
                "cost" : product.price,
                "amount" : product.count,
                "weight" : 100
            }
        )
    }
    // dataJSON.adminInformation.name

    let orderRegistrationBody = {
        "type": 1,
        "tariff_code": dataJSON.adminInformation.tariff_code,
        "comment": "Автоматически сознанный заказ",
        "shipment_point": dataJSON.adminInformation.delivery_point_code_sdek, 
        "delivery_point": dataJSON.order.delivery_point_code,
        "sender": {
            "company": "DARK VAPOR",
            "name": "Вован", 
            "phones": [
                {
                    "number": dataJSON.adminInformation.telephone
                }
            ]
        },
        "recipient": {
            "name": dataJSON.order.last_name + " " + dataJSON.order.first_name + " " + dataJSON.order.patronymic,
            "phones": [
                {
                    "number": dataJSON.order.telephone
                }
            ]
        },
        "packages": [
            {
                "number": "bar-001",
                "weight": dataJSON.order.weight,
                "items" : sdekPrducts,
                "length": 10,
                "width": 15,
                "height": 5
            }
        ]
    }
    console.log("orderRegistrationBody", orderRegistrationBody);
    console.log("orderRegistrationBody.sender", orderRegistrationBody.sender);
    console.log("orderRegistrationBody.recipient", orderRegistrationBody.recipient);

    let uuid = await axios({
        method: 'post',
        url: config.sdek.domen + "/v2/orders",
        headers: { "Authorization": "Bearer "+tokken },
        data: orderRegistrationBody
    }).then(function (response) {
        console.log("Регистрация заказа - response", response.data);
        return response.data.entity.uuid
    }).catch(function (error) {
        console.log("Регистрация заказа ошибка- error");
        console.log(error.response.data.requests[0].errors);
       return null
    });
    let cdek_number = await axios({
        method: 'get',
        url: config.sdek.domen+"/v2/orders/"+uuid,
        headers: { "Authorization": "Bearer "+tokken },
    }).then(function (response) {
        return response.data.entity.cdek_number
    }).catch(function (error) {
       return null
    });
    return {
        "uuid": uuid,
        "cdek_number": cdek_number
    }
}