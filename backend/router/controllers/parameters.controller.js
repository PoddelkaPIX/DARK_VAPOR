// "strength": [{"value": "0", "order": 1 }, {"value": "1.5", "order": 2 }, {"value": "3", "order": 3 }], 
// "salt": [{"value": "10", "order": 1 }, {"value": "20", "order": 2 }], 

module.exports.getParameters= async function (client){
    const resultTypes = await client.query(`SELECT * 
                                            FROM parameter`)
    return resultTypes.rows
}

module.exports.getDefaultParameterValuesByType = async function (client, typeId){
    let data = []
    const resultTypes = await client.query(`SELECT parameter.title_parameter, type_parameter.parameter_id, parameter.group
                                            FROM type_parameter 
                                            JOIN parameter ON type_parameter.parameter_id = parameter.parameter_id
                                            WHERE type_id=$1`, [typeId])
    for (let i of resultTypes.rows){
        const result = await client.query(`SELECT default_parameter_values.default_parameter_value
        FROM default_parameter_values
        WHERE default_parameter_values.parameter_id = $1 `, [i.parameter_id])
        let values = []
        for (let item of result.rows){
            values.push(item.default_parameter_value)
        }
        data.push({
            "parameter_id": i.parameter_id,
            "title_parameter": i.title_parameter,
            "group": i.group,
            "values": values})
    }
    return data
} 


module.exports.getProductParameterValuesByType = async function (client, typeId, productId){
    let data = []
    const resultTypes = await client.query(`SELECT parameter.title_parameter, type_parameter.parameter_id, parameter.group 
                                            FROM type_parameter 
                                            JOIN parameter ON type_parameter.parameter_id = parameter.parameter_id
                                            WHERE type_id=$1`, [typeId])
    for (let i of resultTypes.rows){
        const result = await client.query(`SELECT product_parameter_values.product_parameter_value
        FROM product_parameter_values
        JOIN parameter
        ON  product_parameter_values.parameter_id = parameter.parameter_id
        WHERE product_parameter_values.parameter_id = $1 AND product_parameter_values.product_id = $2 `, [i.parameter_id, productId])
        let values = []
        for (let item of result.rows){
            values.push(item.product_parameter_value)
        }
        data.push({
            "parameter_id": i.parameter_id,
            "title_parameter": i.title_parameter,
            "group": i.group,
            "values": values})
    }
    return data
} 