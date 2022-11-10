module.exports.login = async function(client, data){
    var CryptoJS = require("crypto-js");
    let cryptPassword = CryptoJS.HmacSHA1(data.password, "Key");
    let res = await client.query(`SELECT * FROM admin WHERE password = $1 and login = $2`, [cryptPassword.words[0], data.login] )
    if (res.rows.length !== 0){
        return {"password": cryptPassword.words[0]}
    }
    return {"password": null}
}

module.exports.checkAuthorized = async function(client, data){
    let res = await client.query(`SELECT * FROM admin WHERE password = $1`, [data.password] )
    if (res.rows.length !== 0){
        return {"authorized": true}
    }
    return {"authorized": false}
}

module.exports.getInformation = async function(client){
    let res = await client.query(`SELECT "name", "country", "country_code", "location", "region", "tariff_code", "telephone", "delivery_point_sdek", "delivery_point_code_sdek", "delivery_point_pochta", "delivery_point_code_pochta"  FROM admin` )
    if (res.rows.length === 0){
        return {}
    }
    
    return {
        "data": {
            "name": res.rows[0].name,
            "country": res.rows[0].country,
            "country_code": res.rows[0].country_code,
            "location": res.rows[0].location,
            "region": res.rows[0].region,
            "tariff_code": res.rows[0].tariff_code,
            "telephone": res.rows[0].telephone,
            "delivery_point_sdek": res.rows[0].delivery_point_sdek,
            "delivery_point_code_sdek": res.rows[0].delivery_point_code_sdek,
            "delivery_point_pochta": res.rows[0].delivery_point_pochta,
            "delivery_point_code_pochta": res.rows[0].delivery_point_code_pochta,
        },
        "error": null
    }
}

module.exports.editName = async function(client, name){
    await client.query(`UPDATE admin SET
                                    name = $1`, [name])
}
module.exports.editLocality = async function(client, country, country_code, location, region){
    await client.query(`UPDATE admin SET
                        country = $1,
                        country_code = $2,
                        location = $3,
                        region = $4`, [country, country_code , location, region])
}
module.exports.editTelephone = async function(client, telephone){
    await client.query(`UPDATE admin SET
                                    telephone = $1`, [telephone])
}
module.exports.editDeliveryPointSdek = async function(client, deliveryPoint, deliveryPointCode){
    await client.query(`UPDATE admin SET
                                    delivery_point_sdek = $1,
                                    delivery_point_code_sdek = $2`, [deliveryPoint, deliveryPointCode])
}
// 1134481834
// dark-vapor-shop!

