package app

import (
	"log"
)

type Env struct {
	configuration *configuration
}

func (e *Env) AppVersion() string {
	return e.configuration.Version
}

func (env *Env) SendEmail(subject, body string) error {
	return sendEmail(env, subject, body)
}

func Initialize() (*Env, error) {
	configuration := makeConfiguration()

	if err := configuration.validate(); err != nil {
		log.Fatalf("Invalid environment variables:\n%+v\n", err)
		return nil, err
	}

	env := &Env{
		configuration: configuration,
	}

	return env, nil
}
