module.exports.getCategorys= async function (client){
    const resultTypes = await client.query(`SELECT category_id, title_category
                                            FROM category`)
    return resultTypes.rows
}