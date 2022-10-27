module.exports.getProducts = async function (client){
    const data = []
    const resultTypes = await client.query(`SELECT type.title_type, type.type_id, category.title_category, category.category_id
                                            FROM type 
                                            JOIN category ON category.category_id = type.category_id `)
    for (let i of resultTypes.rows){
        const result = await client.query(`SELECT 
        product.product_id, 
        product.title_product, 
        product.price, 
        product.description, 
        product.available, 
        type.title_type,
        type.type_id,
        category.title_category,
        category.category_id
        FROM product
        JOIN type ON product.type_id = type.type_id
        JOIN category ON category.category_id = type.category_id
        WHERE product.type_id = $1
        ORDER BY product.product_id DESC `, [i.type_id])
        data.push({"title_type": i.title_type, 
                    "type_id": i.type_id, 
                    "title_category": i.title_category, 
                    "category_id": i.category_id, 
                    "products": result.rows})
    }
    return data
} 

module.exports.getProductsByType = async function (client, categoryId){
    const data = []
    const resultTypes = await client.query('SELECT type_id FROM type WHERE category_id=$1', [categoryId])
    for (let i of resultTypes.rows){
        const result = await client.query(`SELECT 
        product.product_id, 
        product.title_product, 
        product.price, 
        product.description, 
        product.available, 
        type.title_type,
        type.type_id,
        category.title_category,
        category.category_id
        FROM product
        JOIN type ON product.type_id = type.type_id
        JOIN category ON category.category_id = type.category_id
        WHERE product.type_id = $1 AND
        product.available = true
        ORDER BY product.product_id DESC`, [i.type_id])
        data.push(result.rows)
    }
    return data
} 

module.exports.addProduct= async function (client, data){
    let product_id =await client.query(`INSERT 
                        INTO product(
                            title_product, 
                            description,
                            price,
                            available,
                            type_id)
                        VALUES ($1, $2, $3, $4, $5) RETURNING product_id;`, [
                            data.title_product, 
                            data.description,
                            data.price,
                            data.available,
                            data.type_id,
                        ])
    product_id = product_id.rows[0].product_id
    for (let parameter of data.parameters){
        for (let value of parameter.values){
            await client.query(`INSERT 
                        INTO product_parameter_values(product_parameter_value, parameter_id, product_id)
                        VALUES ($1, $2, $3);`, [value, parameter.parameter_id, product_id])
        }
    }
}

module.exports.deleteProduct = async function (client, productId){
    await client.query(`DELETE FROM product
    WHERE product_id=$1;`, [productId])
    await client.query(`DELETE FROM product_parameter_values
    WHERE product_id=$1;`, [productId])
}

module.exports.updateProduct= async function (client, data){
    await client.query(`UPDATE product SET
                            title_product = $1, 
                            description = $2,
                            price = $3,
                            available = $4,
                            type_id = $5
                            WHERE product_id = $6;`, [
                            data.title_product, 
                            data.description,
                            data.price,
                            data.available,
                            data.type_id,
                            data.product_id
                        ])
    
    await client.query(`DELETE FROM product_parameter_values
            WHERE product_id=$1;`, [data.product_id])
    for (let parameter of data.parameters){
        for (let value of parameter.values){
            await client.query(`INSERT 
            INTO product_parameter_values(product_parameter_value, parameter_id, product_id)
            VALUES ($1, $2, $3);`, [value, parameter.parameter_id, data.product_id])
        }
    }
}