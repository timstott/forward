## Infrastructure

Create the IAM user `forward.infrastructure` with programmatic access.
Add admin privileges to the user to provision all resources
(we will remove them at the end).

```console
# Configure aws profile with user credentials
aws configure --profile forward.infrastructure
```

```console
# Initilise infrastructure state bucket
./init.sh
```

```console
# Create environment specific states
terraform workspace new dev
terraform workspace new production
```

```console
# Provision environment
terraform workspace select dev
terraform plan
terraform apply
```

The changes will create a stage deployment user without access keys. They
must be manually created from the AWS console.

```console
# Configure aws profile with the deployment user access keys
aws configure --profile forward.dev.deployment
```

Remove admin access to `forward.infrastructure` user.

You are now ready to deploy 🎉!

# UnTerraformed Infrastructure

The following bits of infrastructure require manual setup:

- Route 53 Zone creation
- AWS ACM SSL certificate verification
- SES domain name verification
- SES email address verification
- API Gateway Custom Domain Name creation
