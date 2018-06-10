package main

import (
	"github.com/timstott/forward/api"
	"github.com/timstott/forward/app"
)

func main() {
	env, _ := app.Initialize()
	api.Router(env).Run("localhost:8081")
}
