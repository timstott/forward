## Infrastructure

Create the IAM role `forward-infrastructure` with Administrator policy.

```console
# initilise infrastructure state bucket
./init.sh
```

To provision an environment cd into its specific directory

```console
cd development
terraform init
terraform plan
```

In addition to provisioning the environment a deployment user with deploy only
access will be created. However you must manually created its access key from
the AWS console.

```console
# configure aws profile with the deployment user access key
aws configure --profile forward-dev-deployment
```

Remove admin access to `forward-infrastructure` user.

You are now ready to deploy 🎉!

# UnTerraformed Infrastructure

The following bits of infrastructure require manual setup:

- SES email address verification
