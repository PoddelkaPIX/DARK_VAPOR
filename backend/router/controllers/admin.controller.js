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
    let res = await client.query(`SELECT "name", "locality", "locality_fias_id", "tariff_code", "telephone", "delivery_point_sdek", "delivery_point_code_sdek", "delivery_point_pochta", "delivery_point_code_pochta"  FROM admin` )
    if (res.rows.length === 0){
        return {}
    }
    
    return {
        "name": res.rows[0].name,
        "locality": res.rows[0].locality,
        "locality_fias_id": res.rows[0].locality_fias_id,
        "tariff_code": res.rows[0].tariff_code,
        "telephone": res.rows[0].telephone,
        "delivery_point_sdek": res.rows[0].delivery_point_sdek,
        "delivery_point_code_sdek": res.rows[0].delivery_point_code_sdek,
        "delivery_point_pochta": res.rows[0].delivery_point_pochta,
        "delivery_point_code_pochta": res.rows[0].delivery_point_code_pochta,
    }
}

module.exports.editName = async function(client, name){
    await client.query(`UPDATE admin SET
                                    name = $1`, [name])
}
module.exports.editLocality = async function(client, locality, fias_id){
    await client.query(`UPDATE admin SET
                                    locality_fias_id = $1,
                                    locality = $2`, [fias_id, locality])
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

