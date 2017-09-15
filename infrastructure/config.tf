variable "region" {
  description = "AWS region in which to create infrastructure"
  default     = "eu-west-1"
}

variable "service" {
  description = "Name of the Serverless service being deployed"
  default     = "forward"
}

terraform {
  backend "s3" {
    bucket  = "forward.terraform.state"
    key     = "terraform.tfstate"
    profile = "forward.infrastructure"
    region  = "eu-west-1"
  }
}

provider "aws" {
  profile = "forward.infrastructure"
  region  = "${var.region}"
}
