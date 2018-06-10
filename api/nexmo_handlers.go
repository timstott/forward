package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
)

type nexmoInboundSmsPaylaod struct {
	From             string `json:"msisdn" binding:"required"`
	To               string `json:"to" binding:"required"`
	MessageID        string `json:"messageId" binding:"required"`
	Text             string `json:"text" binding:"required"`
	Type             string `json:"type" binding:"required"`
	MessageTimestamp string `json:"message-timestamp" binding:"required"`
}

func (n *nexmoInboundSmsPaylaod) makeOuboundEmail() (string, string) {
	subject := fmt.Sprintf("Inbound SMS from %s", n.From)
	message := fmt.Sprintf(
		"To: %s\nText: %s\nTimestamp: %s\n",
		n.To, n.Text, n.MessageTimestamp,
	)
	return subject, message
}

func nexmoInboundSmsHandler(env Env) gin.HandlerFunc {
	return func(c *gin.Context) {
		var payload nexmoInboundSmsPaylaod
		if err := c.BindJSON(&payload); err == nil {
			err = env.SendEmail(payload.makeOuboundEmail())

			if err != nil {
				log.Printf("%v", err)
				c.JSON(500, gin.H{"message": "unable to forward sms"})
			}
			c.JSON(201, gin.H{"message": "sms forwarded"})
		} else {
			c.JSON(400, gin.H{"error": err.Error()})
		}
	}
}
