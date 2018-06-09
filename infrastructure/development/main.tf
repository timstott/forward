terraform {
  required_version = "0.11.7"

  backend "s3" {
    bucket  = "forward-terraform-state"
    key     = "development.tfstate"
    encrypt = true
    profile = "forward.infrastructure"
    region  = "eu-west-1"
  }
}

module "forward" {
  source = "../forward"

  environment = "development"
}

output api_base_url {
  value = "${module.forward.api_base_url}"
}
