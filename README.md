# Forward

Forwards SMS to email.

Why? Because a Swiss bank won't text OTP codes to non-Swiss mobile numbers.

To complete online transactions an OTP is sent over SMS or can
be computed with a device issued by the bank. These devices are often
inconvenient to carry and mobile numbers are country restricted.

Behold Twilio! We can create a number in the bank's country and
have all messages forwarded to us via email.

This project attempts to solve this challenge while keeping operational costs
to a minimum.

## Setup

```console
brew install awscli
brew install terraform

yarn install
```

## Deployment
Make sure the infrastructure has been provisioned see [documentation](./infrastructure/README.md)

```console
npm-exec serverless --aws-profile forward.dev.deployment --stage dev deploy
```
