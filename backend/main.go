package main

import (
	"github.com/gin-gonic/gin"
	"dark_vapor/backend/db"
)

var cfg = db.Load("./settings.cfg")

func init() {
	err := db.Connect(*cfg)
	if err != nil {
		panic(err)
	}
	
}

func main(){
	router := gin.Default()

	router.GET("/", handlerMain)
	router.LoadHTMLGlob("../frontend/templates/*.html")
	router.Static("/images/", "../frontend/images")
	router.Static("/js/", "../frontend/js")
	router.Static("/css/", "../frontend/styles")
	router.Static("/fonts/", "../frontend/fonts")
	// router.Use(favicon.New("../resources/favicon.ico"))
	_ = router.Run(cfg.Host + ":" + cfg.Port)
	

}

func handlerMain(c *gin.Context){
	c.HTML(200, "index.html", nil)
}