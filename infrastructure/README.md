## Infrastructure

Create the IAM user `sms-to-email-infrastructure` with programmatic access.
Add admin privileges to the user to provision all resources
(we will remove them at the end).

```console
# Configure aws profile with user credentials
aws configure --profile sms-to-email-infrastructure
```

```console
# Initilise infrastructure state bucket
./init.sh
```

```console
# Create environment specific states
terraform env new dev
terraform env new production
```

```console
# Provision environment
terraform env select dev
terraform plan
terraform apply
```

The changes will create a stage deployment user without access keys. They
must be manually created from the AWS console.

```console
# Configure aws profile with the deployment user access keys
aws configure --profile sms-to-email-dev-deployment
```

Remove admin access to `sms-to-email-infrastructure` user.

You are now ready to deploy 🎉!
