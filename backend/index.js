const express = require("express")
const app = express()
const port = "8000"

app.use(function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET")
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type")
    res.setHeader("Access-Control-Allow-Credentials", true)
    next()
})

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.listen(port, ()=>{console.log("Сервер запущен на порту: "+port)})

require("./router/routes")(app)