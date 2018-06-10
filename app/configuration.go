package app

import (
	validator "gopkg.in/go-playground/validator.v9"
	"os"
)

var (
	version string
)

type configuration struct {
	DestinationEmail string `validate:"required,email"`
	SourceEmail      string `validate:"required,email"`
	Version          string
}

func makeConfiguration() *configuration {
	return &configuration{
		DestinationEmail: os.Getenv("DESTINATION_EMAIL"),
		SourceEmail:      os.Getenv("SOURCE_EMAIL"),
		Version:          version,
	}
}

func (c *configuration) validate() error {
	return validator.New().Struct(c)
}
