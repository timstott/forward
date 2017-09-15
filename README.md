# Forward

Forwards SMS to email with optional PGP encryption.

Why? This project is the child of frustrations with a foreign bank.

To complete online transactions an OTP is sent over SMS or can be computed
with a device issued by the bank. However SMS can only be sent to local numbers
and taking the device everywhere with you is impractical.

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
