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

app.listen(port, ()=>{console.log("Сервер запущен на порту: "+port)})

require("./routes/routes")(app)
require("./db/connect")