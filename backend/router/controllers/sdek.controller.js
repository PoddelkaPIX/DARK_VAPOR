const axios = require("axios")
const config = require("../../config.json")
const fetch = require("cross-fetch")

module.exports.getCityesSdek = async function(tokken, regionCode){
    url = config.sdek.domen + "/v2/location/cities/?region_code="+regionCode
    let data = await axios({
        method: 'get',
        url: url,
        headers: { "Authorization": "Bearer "+tokken },
    })
    .then(function (response) {
        return {
            "data": response.data,
            "error": null
        }
    })
    .catch(function (error) {
        return {
            "data": null,
            "error": error
        }
    });
    return data
}
async function getCitySdek(tokken, location, country_code, region_name){
    url = config.sdek.domen+"/v2/location/cities/?city="+location+"&country_codes="+country_code
    let data = await fetch(url, { 
        method: 'get',
        headers: {
            "Authorization": "Bearer "+tokken
        }
    }).then(response =>(response.json())).then(result =>{
        for (let i of result){
            let a = i.region.toLowerCase()
            if (a.includes(region_name.toLowerCase())){
                return {
                    "data": i,
                    "error": null
                }
            }
        }
        return {
            "data": {
                code: 0
            },
            "error": "Нет такого города"
        }
        
    }).catch(function (error) {
        return {
            "data": null,
            "error": error
        }
    }); 
    return data
}

module.exports.getDeliverypointsSdek = async function(tokken, location, country_code, region_name){
    const location_code = await getCitySdek(tokken, location, country_code, region_name)
    let url = config.sdek.domen+"/v2/deliverypoints?city_code="+location_code.data.code+"&is_handout=true&is_reception=true"
    let data = await axios({
        method: 'get',
        url: url,
        headers: { "Authorization": "Bearer "+tokken },
    })
    .then(function (response) {
        return {
            "data": response.data,
            "error": null
        }
    })
    .catch(function (error) {
        return {
            "data": null,
            "error": error
        }
    });
    return data
}

module.exports.calculateDeliverySdek = async function(tokken, dataJSON){
    console.log(dataJSON);
    const from_location_code = await getCitySdek(tokken, dataJSON.from_location, dataJSON.from_country_code, dataJSON.from_region) 
    const to_location_code = await getCitySdek(tokken, dataJSON.to_location, dataJSON.to_country_code, dataJSON.to_region) 
   
    body = {
        "currency": "1",
        "tariff_code": Number(dataJSON.tariff_code),
        "from_location": {
            "code": from_location_code.data.code
        },
        "to_location": {
            "code": to_location_code.data.code
        },
        "packages": [
            {
                "weight": 500,
            }
        ]
    }
    let url = config.sdek.domen + "/v2/calculator/tariff"
    let data = await axios({
        method: 'post',
        url: url,
        headers: { "Authorization": "Bearer "+tokken },
        data: body
    })
    .then(function (response) {
        return {
            "data": response.data,
            "error": null
        }
    })
    .catch(function (error) {
        return {
            "data": null,
            "error": error
        }
    });

    return data
}
module.exports.orderRegistration = async function(tokken, dataJSON){
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
    let uuid = await axios({
        method: 'post',
        url: config.sdek.domen + "/v2/orders",
        headers: { "Authorization": "Bearer "+tokken },
        data: orderRegistrationBody
    }).then(function (response) {
        return {
            "data": response.data.entity.uuid,
            "error": null
        }
    }).catch(function (error) {
        return {
            "data": null,
            "error": error
        }
    });

    let cdek_number = await axios({
        method: 'get',
        url: config.sdek.domen+"/v2/orders/"+uuid.data,
        headers: { "Authorization": "Bearer "+tokken },
    }).then(function (response) {
        return {
            "data": response.data.entity.uuid,
            "error": null
        }
    }).catch(function (error) {
       return {
        "data": null,
        "error": error
    }
    });

    return {
        "uuid": uuid.data,
        "cdek_number": cdek_number.data, 
    }
}

module.exports.getOrderInformationSdek = async function(tokken, uuid){
    let sdek_number = await axios({
        method: 'get',
        url: config.sdek.domen + "/v2/orders/"+uuid,
        headers: { "Authorization": "Bearer "+tokken },
    }).then(function (response) {
        return {
            "data": response.data.entity.cdek_number,
            "error": null
        }
    }).catch(function (error) {
        return {
            "data": null,
            "error": error
        }
    });
    return sdek_number
}