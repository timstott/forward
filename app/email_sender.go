package app

import (
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/ses"
)

type OutboundEmail struct {
	ToAddress     string
	SourceAddress string
	Subject       string
	Body          string
}

func sendEmail(env *Env, subject, body string) error {
	toAddress := env.configuration.DestinationEmail
	sourceAddress := env.configuration.SourceEmail

	email := &OutboundEmail{
		ToAddress:     toAddress,
		SourceAddress: sourceAddress,
		Subject:       subject,
		Body:          body,
	}

	return sendEmailViaSES(email)
}

func sendEmailViaSES(email *OutboundEmail) error {
	currentSession := session.Must(session.NewSession())
	sesClient := ses.New(currentSession)

	sesEmailInput := &ses.SendEmailInput{
		Destination: &ses.Destination{
			ToAddresses: []*string{
				&email.ToAddress,
			},
		},
		Message: &ses.Message{
			Body: &ses.Body{
				Text: &ses.Content{
					Data: &email.Body,
				},
			},
			Subject: &ses.Content{
				Data: &email.Subject,
			},
		},
		Source: &email.SourceAddress,
	}

	_, err := sesClient.SendEmail(sesEmailInput)

	return err
}
