// RequestLogger adapted from gin-gonic/gin/issues/961
// https://github.com/gin-gonic/gin/issues/961#issuecomment-312504339
package api

import (
	"bytes"
	"github.com/gin-gonic/gin"
	"io"
	"io/ioutil"
	"log"
)

func requestLoggerHandler(c *gin.Context) {
	buf, _ := ioutil.ReadAll(c.Request.Body)
	rdr1 := ioutil.NopCloser(bytes.NewBuffer(buf))
	rdr2 := ioutil.NopCloser(bytes.NewBuffer(buf)) //We have to create a new Buffer, because rdr1 will be read.

	log.Println(readBody(rdr1)) // Print request body

	c.Request.Body = rdr2
	c.Next()
}

func readBody(reader io.Reader) string {
	buf := new(bytes.Buffer)
	buf.ReadFrom(reader)

	s := buf.String()
	return s
}
