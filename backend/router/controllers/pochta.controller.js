const axios = require("axios")
const config = require("../../config.json")

module.exports.getDeliverypointsPochta = async function(address, tokken){
    // url = config.sdek.domen + "/v2/deliverypoints?fias_guid="+address+"&is_handout=true&is_reception=true"
    // let data = await axios({
    //     method: 'get',
    //     url: url,
    //     headers: { "Authorization": "Bearer "+tokken },
    // })
    // .then(function (response) {
    //     return response.data
    // })
    // .catch(function (error) {
    //     return error;
    // });

    // return data
    return []
}

module.exports.calculateDeliveryPochta = async function(tokken, dataJSON){
    // https://tariff.pochta.ru/v2/calculate/tariff?json&object=27030&dogovor=7724490000&from=640002&to=101000&weight=1000&pack=10&return=640002&date=20221017&time=2115
    const from_location_code = await getCity(tokken, dataJSON.from_location_fias_id) 
    const to_location_code = await getCity(tokken, dataJSON.to_location_fias_id) 
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

