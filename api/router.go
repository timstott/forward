package api

import (
	"github.com/gin-gonic/gin"
)

type Env interface {
	AppVersion() string
	SendEmail(string, string) error
}

func pingHanlder(c *gin.Context) {
	c.JSON(200, gin.H{"message": "pong"})
}

func versionHanlder(env Env) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(200, gin.H{"version": env.AppVersion()})
	}
}

func noRouteHandler(c *gin.Context) {
	c.JSON(404, gin.H{"error": "not found"})
}

func Router(env Env) *gin.Engine {
	router := gin.Default()
	router.Use(requestLoggerHandler)
	router.GET("/ping", pingHanlder)
	router.GET("/version", versionHanlder(env))
	router.POST("/nexmo/inbound", nexmoInboundSmsHandler(env))
	router.NoRoute(noRouteHandler)

	return router
}
