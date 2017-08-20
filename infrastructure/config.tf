variable "region" {
  description = "AWS region in which to create infrastructure"
  default     = "eu-west-1"
}

variable "service" {
  description = "Name of the Serverless service being deployed"
  default     = "sms-to-email"
}

terraform {
  backend "s3" {
    bucket  = "sms-to-email-terraform-state"
    key     = "terraform.tfstate"
    profile = "sms-to-email-infrastructure"
    region  = "eu-west-1"
  }
}

provider "aws" {
  profile = "sms-to-email-infrastructure"
  region  = "${var.region}"
}
