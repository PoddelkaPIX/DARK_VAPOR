module.exports.addType= async function (client, data){
    let type_id =await client.query(`INSERT 
                        INTO type(title_type, category_id)
                        VALUES ($1, $2) RETURNING type_id;`, [data.title_type, data.category_id])
    type_id = type_id.rows[0].type_id
    for (let parameter_id of data.parameters){
        await client.query(`INSERT 
                        INTO type_parameter(type_id, parameter_id)
                        VALUES ($1, $2);`, [type_id, parameter_id])
    }
}

module.exports.deleteType = async function (client, typeId){
    await client.query(`DELETE FROM product
    WHERE type_id=$1;`, [typeId])
    await client.query(`DELETE FROM type
    WHERE type_id=$1;`, [typeId])
    await client.query(`DELETE FROM type_parameter
    WHERE type_id=$1;`, [typeId])
}