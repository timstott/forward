terraform {
  required_version = "0.11.7"

  backend "s3" {
    bucket  = "forward-terraform-state"
    key     = "production.tfstate"
    encrypt = true
    profile = "forward.infrastructure"
    region  = "eu-west-1"
  }
}

variable "destination_email" {}

module "forward" {
  source = "../forward"

  environment       = "production"
  destination_email = "${var.destination_email}"
}

output api_base_url {
  value = "${module.forward.api_base_url}"
}
