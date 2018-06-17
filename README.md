# Forward

[![CircleCI](https://img.shields.io/circleci/project/github/timstott/forward.svg?style=flat-square)](https://circleci.com/gh/timstott/forward/tree/master)
[![GitHub Release](https://img.shields.io/github/release/timstott/forward.svg?style=flat-square)](https://github.com/timstott/forward/releases)

## Description

Forwards SMS to email.

Why? Because some banks won't text OTP codes to international mobile numbers.

OTP codes can be required to complete certain types of online transactions. You
usually can choose to have the codes sent over SMS or generate them with a
device issued by the bank. These devices are usually inconvenient to carry and
mobile numbers are country restricted.

To workaround this limitation we can create programmable mobile number in the
bank's country of origin and make all texts forward to an email address.

This project attempts to solve this challenge while keeping operational costs to
a minimum.

## Setup

```console
# awscli required to deploy
# go required to build the project
# terraform required to provision the infrastructure
brew install awscli go terraform
```

## Deployment
Make sure the infrastructure has been provisioned see [documentation](./infrastructure/README.md)

```console
# compile and deploy binary
bin/deploy -e production -f $(bin/build)
```
