const axios = require("axios")
const config = require("../../config.json")
module.exports.getRegionsSdek = async function(tokken){
    url = config.sdek.domen + "/v2/location/regions?country_codes=RU"
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
    console.log(dataJSON);
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
        "comment": "Новый заказ",
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
            "name": dataJSON.order.last_name + " " + dataJSON.order.first_name + " " + dataJSON.order.patronimyc,
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
    url = config.sdek.domenEdu + "/v2/orders"
    let uuid = await axios({
        method: 'post',
        url: url,
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
    return uuid
}

module.exports.createReceiptSdek = async function(tokken, uuid){
    // const FileDownload = require('js-file-download');
    //     axios({
    //         url: 'http://api.edu.cdek.ru/v2/print/orders/72753031-d86a-4ec9-9e7a-bbe777a30930.pdf',
    //         method: 'GET',
    //         responseType: 'blob', // Important
    //         headers: { "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJvcmRlcjphbGwiLCJwYXltZW50OmFsbCJdLCJleHAiOjE2NjY0NTEwMDgsImF1dGhvcml0aWVzIjpbInNoYXJkLWlkOnJ1LTAxIiwiY2xpZW50LWNpdHk60J3QvtCy0L7RgdC40LHQuNGA0YHQuiwg0J3QvtCy0L7RgdC40LHQuNGA0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwiLCJmdWxsLW5hbWU60KLQtdGB0YLQuNGA0L7QstCw0L3QuNC1INCY0L3RgtC10LPRgNCw0YbQuNC4INCY0JwsINCe0JHQqdCV0KHQotCS0J4g0KEg0J7Qk9Cg0JDQndCY0KfQldCd0J3QntCZINCe0KLQktCV0KLQodCi0JLQldCd0J3QntCh0KLQrNCuIiwiYWNjb3VudC1sYW5nOnJ1cyIsImNvbnRyYWN0OtCY0Jwt0KDQpC3Qk9Cb0JMtMjIiLCJhY2NvdW50LXV1aWQ6ZTkyNWJkMGYtMDVhNi00YzU2LWI3MzctNGI5OWMxNGY2NjlhIiwiYXBpLXZlcnNpb246MS4xIiwiY2xpZW50LWlkLWVjNTplZDc1ZWNmNC0zMGVkLTQxNTMtYWZlOS1lYjgwYmI1MTJmMjIiLCJjbGllbnQtaWQtZWM0OjE0MzQ4MjMxIiwiY29udHJhZ2VudC11dWlkOmVkNzVlY2Y0LTMwZWQtNDE1My1hZmU5LWViODBiYjUxMmYyMiIsInNvbGlkLWFkZHJlc3M6ZmFsc2UiXSwianRpIjoiYTFkMTFkMDctOGRkOC00MGFlLWFkY2MtMTZlMGRjYmM0ZjUwIiwiY2xpZW50X2lkIjoiRU1zY2Q2cjlKbkZpUTNiTG95akpZNmVNNzhKckpjZUkifQ.hWDRbafotJAFjMvIU9-ww1zcFFtljVGlqPGKUn2e_uuXKBqvyrZWtPG1jKYGBdAKfp0sMkRWhjc03_J7izQE7bRwM4mMRNDbQQShZ5-mQBEpoW5tiP-Muy2PYOAD_vzxIVHTGThcy9NGzPH3z7EhjDlivZsssBEBOtz_i_AQbULUQZNY43XMIRWerQ_U7VzVnhd09ouChbnxde9XF2oJCfu4yQCYjq1FQ6uTnjixCs9i7KFawMM_A5URx_QSafZ-cn8n55bTeoI80gYt6rYRWq9SlfHQw9f3qBqv3_MLFy0RMRCQVSQUElXDBTs9Z1Y-sgPfOS9Ucml2IQcX_QzqZQ" },

    //     }).then((response) => {
    //         FileDownload(response.data, 'report.pdf');
    //     });
    fetch('http://api.edu.cdek.ru/v2/print/orders/72753031-d86a-4ec9-9e7a-bbe777a30930.pdf', {
        method: 'GET',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJvcmRlcjphbGwiLCJwYXltZW50OmFsbCJdLCJleHAiOjE2NjY0NTEwMDgsImF1dGhvcml0aWVzIjpbInNoYXJkLWlkOnJ1LTAxIiwiY2xpZW50LWNpdHk60J3QvtCy0L7RgdC40LHQuNGA0YHQuiwg0J3QvtCy0L7RgdC40LHQuNGA0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwiLCJmdWxsLW5hbWU60KLQtdGB0YLQuNGA0L7QstCw0L3QuNC1INCY0L3RgtC10LPRgNCw0YbQuNC4INCY0JwsINCe0JHQqdCV0KHQotCS0J4g0KEg0J7Qk9Cg0JDQndCY0KfQldCd0J3QntCZINCe0KLQktCV0KLQodCi0JLQldCd0J3QntCh0KLQrNCuIiwiYWNjb3VudC1sYW5nOnJ1cyIsImNvbnRyYWN0OtCY0Jwt0KDQpC3Qk9Cb0JMtMjIiLCJhY2NvdW50LXV1aWQ6ZTkyNWJkMGYtMDVhNi00YzU2LWI3MzctNGI5OWMxNGY2NjlhIiwiYXBpLXZlcnNpb246MS4xIiwiY2xpZW50LWlkLWVjNTplZDc1ZWNmNC0zMGVkLTQxNTMtYWZlOS1lYjgwYmI1MTJmMjIiLCJjbGllbnQtaWQtZWM0OjE0MzQ4MjMxIiwiY29udHJhZ2VudC11dWlkOmVkNzVlY2Y0LTMwZWQtNDE1My1hZmU5LWViODBiYjUxMmYyMiIsInNvbGlkLWFkZHJlc3M6ZmFsc2UiXSwianRpIjoiYTFkMTFkMDctOGRkOC00MGFlLWFkY2MtMTZlMGRjYmM0ZjUwIiwiY2xpZW50X2lkIjoiRU1zY2Q2cjlKbkZpUTNiTG95akpZNmVNNzhKckpjZUkifQ.hWDRbafotJAFjMvIU9-ww1zcFFtljVGlqPGKUn2e_uuXKBqvyrZWtPG1jKYGBdAKfp0sMkRWhjc03_J7izQE7bRwM4mMRNDbQQShZ5-mQBEpoW5tiP-Muy2PYOAD_vzxIVHTGThcy9NGzPH3z7EhjDlivZsssBEBOtz_i_AQbULUQZNY43XMIRWerQ_U7VzVnhd09ouChbnxde9XF2oJCfu4yQCYjq1FQ6uTnjixCs9i7KFawMM_A5URx_QSafZ-cn8n55bTeoI80gYt6rYRWq9SlfHQw9f3qBqv3_MLFy0RMRCQVSQUElXDBTs9Z1Y-sgPfOS9Ucml2IQcX_QzqZQ",
            'Content-Type': 'application/pdf',
        }
    }).then((response) => response.blob()).then((blob) => {
        // Create blob link to download
        const urll = window.URL.createObjectURL(
            new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = urll;
        link.setAttribute(
            'download',
            `FileName.pdf`,
        )
    })
    let body = {
        "orders": [
            {
                "order_uuid": uuid
            }
        ],
        "copy_count": 1
    }
    let url = config.sdek.domenEdu + "/v2/print/orders"
    let data = await axios({
        method: 'post',
        url: url,
        headers: { "Authorization": "Bearer "+tokken },
        data: body
    })
    .then(function (response) {
        return response.data.entity.uuid
    })
    .catch(function (error) {
        console.log("error", error.data);
        return error;
    });
  
    url = config.sdek.domenEdu + "/v2/print/orders/" + data
    
    dataUrl = await axios({
        method: 'get',
        url: url,
        headers: { "Authorization": "Bearer "+tokken },
        data: body
    })
    .then(function (response) {
        return response.data.entity.url
    })
    .catch(function (error) {
        console.log("error url", error.data);
        return null;
    });
    return dataUrl
}
