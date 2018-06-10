package main

import (
	"github.com/apex/gateway"
	"github.com/timstott/forward/api"
	"github.com/timstott/forward/app"
	"log"
)

func main() {
	env, _ := app.Initialize()
	log.Fatal(gateway.ListenAndServe("", api.Router(env)))
}
