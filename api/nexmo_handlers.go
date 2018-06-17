package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net"
)

var nexmoCIDRs = []string{
	"174.37.245.32/29",
	"174.36.197.192/28",
	"173.193.199.16/28",
	"119.81.44.0/28",
}

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
		if !isIPInCIDRRange(c.ClientIP(), nexmoCIDRs) {
			c.JSON(401, gin.H{"message": "unauthorized"})
			return
		}

		var payload nexmoInboundSmsPaylaod
		if err := c.BindJSON(&payload); err == nil {
			err = env.SendEmail(payload.makeOuboundEmail())
			if err != nil {
				log.Printf("failed to send email: %v", err)
				c.JSON(500, gin.H{"message": "unable to forward sms"})
			} else {
				c.JSON(201, gin.H{"message": "sms forwarded"})
			}
		} else {
			c.JSON(400, gin.H{"error": err.Error()})
		}
	}
}

func isIPInCIDRRange(ip string, cidrs []string) bool {
	ipNet := net.ParseIP(ip)
	for _, cidr := range cidrs {
		_, cidrNet, _ := net.ParseCIDR(cidr)
		if cidrNet.Contains(ipNet) {
			return true
		}
	}
	return false
}
