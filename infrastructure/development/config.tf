terraform {
  backend "s3" {
    bucket  = "forward-terraform-state"
    key     = "development.tfstate"
    encrypt = true

    region = "eu-west-1"
  }
}

provider "aws" {
  version = "1.18.0"
  region  = "eu-west-1"
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
