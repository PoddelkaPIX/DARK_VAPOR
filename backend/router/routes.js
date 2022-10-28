const { Client } = require('pg'); 
const { getProducts, getProductsByType, deleteProduct, addProduct, updateProduct} = require('./controllers/products.controller');
const { getParameters, getDefaultParameterValuesByType, getProductParameterValuesByType} = require('./controllers/parameters.controller');
const { addType, deleteType} = require('./controllers/type.controller');
const { getCategorys } = require('./controllers/category.controller');
const { login, checkAuthorized, getInformation, editName, editLocality, editTelephone, editDeliveryPointSdek } = require('./controllers/admin.controller');
const { getCityesSdek, getRegionsSdek, getDeliverypointsSdek, calculateDeliverySdek, createReceiptSdek } = require('./controllers/sdek.controller');
const { getDeliverypointsPochta, calculateDeliveryPochta } = require('./controllers/pochta.controller');
const { getOrders, addOrder, orderConfirmed, deleteOrder } = require('./controllers/order.controller');
const config = require("../config.json")

let paramsEdu = {
    "grant_type": config.sdek.grant_type,
    "client_id": config.sdek.client_id_edu,
    "client_secret": config.sdek.client_secret_edu
}
let params = {
    "grant_type": config.sdek.grant_type,
    "client_id": config.sdek.client_id,
    "client_secret": config.sdek.client_secret
}
let quaryParams = new URLSearchParams(params).toString();
let quaryParamsEdu = new URLSearchParams(paramsEdu).toString();

async function getTokken(){
   return await fetch(config.sdek.domen + "/v2/oauth/token?" + quaryParams, { 
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
        }
    }).then(response => (response.json())
    ).then(result =>{return result}).catch(result =>{console.log(result); return null})
}

async function getTokkenEdu(){
    return await fetch(config.sdek_edu.domen_edu + "/v2/oauth/token?" + quaryParamsEdu, { 
         method: 'POST',
         headers: {
             "Content-Type": "application/x-www-form-urlencoded",
             "Access-Control-Allow-Origin": "*",
         }
     }).then(response => (response.json())
     ).then(result =>{return result}).catch(result =>{console.log(result); return null})
 }

const client = new Client({ 
    user: config.db.user,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port,
}); 

client.connect(); 

module.exports = async function(app){
    // Продукты
    app.get('/products', async function(req, res) {
        res.json(await getProducts(client))
        return
    })
    app.get('/productsByCategory/:categoryId',async function(req, res) {
        res.json(await getProductsByType(client, req.param("categoryId")))
        return
    });
    app.post('/addProduct',async function(req, res) {
        await addProduct(client, req.body)
        res.send("complite");
        return
    });
    app.post("/updateProduct", async function(req, res){
        await updateProduct(client, req.body)
        res.send("complite");
        return
    })
    app.post("/deleteProduct", async function(req, res){
        await deleteProduct(client, req.body.product_id)
        res.send("complite");
        return
    })

    // Параметры
    app.get('/parameters',async function(req, res) {
        res.json(await getParameters(client))
        return
    });

    // Параметры - Значения параметров в типе по умолчанию
    app.get('/defaultParameterValuesByType/:typeId',async function(req, res) {
        res.json(await getDefaultParameterValuesByType(client, req.param("typeId")))
        return
    });

    // Параметры - Значения параметров в типе у продукта
    app.get('/productParameterValuesByType/:typeId/:productId',async function(req, res) {
        res.json(await getProductParameterValuesByType(client, req.param("typeId"), req.param("productId")))
        return
    });
    
    // Заказы 
    app.get('/orders', async function(req, res) {
        res.json(await getOrders(client))
        return
    })
    app.post('/addOrder',async function(req, res) {
        res.send(await addOrder(client, req.body))
        return
    });
    app.post("/orderConfirmed", async function(req, res){
        const tokken = await getTokken()
        res.json(await orderConfirmed(tokken.access_token, client, req.body));
        return
    }) 
    app.post("/deleteOrder", async function(req, res){
        await deleteOrder(client, req.body.order_id)
        res.send("complite");
        return
    }) 
    
    // Категории 
    app.get('/getCaregorys',async function(req, res) {
        res.json(await getCategorys(client))
        return
    });

    // Типы
    app.post('/addType',async function(req, res) {
        await addType(client, req.body)
        res.send("complite");
        return
    });
    app.post("/deleteType", async function(req, res){
        await deleteType(client, req.body.type_id)
        res.send("complite");
        return
    }) 

    // Сдэк
    app.get('/getRegionsSdek',async function(req, res) { 
        const tokken = await getTokken()
        if(tokken !== null){
            res.json(await getRegionsSdek(tokken.access_token))
        }
        return
    });

    app.get('/getCityesSdek/:regionCode',async function(req, res) { 
        const tokken = await getTokken()
        if(tokken !== null){
            res.json(await getCityesSdek(tokken.access_token, req.param("regionCode")))
        }
        return
    });

    app.get('/getDeliverypointsSdek/:cityCode',async function(req, res) { 
        const tokken = await getTokken()
        if(tokken !== null){
            res.json(await getDeliverypointsSdek(req.param("cityCode"), tokken.access_token))
        }
        return
    });
    app.get('/createReceiptSdek/:uuid',async function(req, res) { 
        const tokken = await getTokken()
        if(tokken !== null){
            const urlPfd = await createReceiptSdek(tokken.access_token, req.param("uuid"))
            res.header('Authorization', "Bearer "+tokken);
            res.redirect(urlPfd);
        }
        return
    });
    app.post('/calculateCostOfDeliverySdek', async function(req, res) { 
        const tokken = await getTokken()
        if(tokken !== null){
            res.json(await calculateDeliverySdek(tokken.access_token, req.body))
        }
        return
    });
  
     // Почта России
    app.get('/getDeliverypointsPochta/:address',async function(req, res) { 
        const tokken = await getTokken()
        if(tokken !== null){
            res.json(await getDeliverypointsPochta(req.param("address"), tokken.access_token))
        }
        return
    });
    app.post('/calculateCostOfDeliveryPochta', async function(req, res) { 
        const tokken = await getTokken()
        if(tokken !== null){
            res.json(await calculateDeliveryPochta(tokken.access_token, req.body))
        }
        return
    });
    

    // Аккаунт
    app.post('/login',async function(req, res) {
        res.send(await login(client, req.body))
        return
    });
    app.post('/authorized',async function(req, res) {
        res.send(await checkAuthorized(client, req.body))
        return
    });
    app.get('/getInformation',async function(req, res) {
        res.json(await getInformation(client))
        return
    });

    app.get('/editName/:name',async function(req, res) {
        editName(client, req.param("name"))
        res.send("complite");
        return
    });
    app.get('/editLocality/:locality/:fias_id',async function(req, res) {
        editLocality(client, req.param("locality"), req.param("fias_id"))
        res.send("complite");
        return
    });
    app.get('/editTelephone/:telephone',async function(req, res) {
        editTelephone(client, req.param("telephone"))
        res.send("complite");
        return
    });
    app.get('/editDeliveryPointSdek/:deliveryPoint/:deliveryPointCode',async function(req, res) {
        editDeliveryPointSdek(client, req.param("deliveryPoint"), req.param("deliveryPointCode"))
        res.send("complite");
        return
    });
}