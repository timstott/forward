locals {
  environment = "production"
}

resource "aws_ssm_parameter" "destination_email" {
  name  = "/forward/${local.environment}/destination-email"
  type  = "String"
  value = "example.com"

  lifecycle {
    ignore_changes = ["value"]
  }
}

module "forward" {
  source = "../forward"

  environment       = "${local.environment}"
  destination_email = "${aws_ssm_parameter.destination_email.value}"

  providers {
    aws     = "aws"
    aws.acm = "aws.us_east_1"
  }
}

output api_base_url {
  value = "${module.forward.api_base_url}"
}
