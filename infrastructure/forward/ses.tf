locals {
  domain_name = "${var.environment}.${var.service}.${var.hosted_zone}"
}

resource "aws_ses_domain_identity" "main" {
  domain = "${local.domain_name}"
}

resource "aws_route53_record" "ses_verification" {
  name    = "_amazonses.${local.domain_name}"
  zone_id = "${data.aws_route53_zone.main.id}"
  type    = "TXT"
  ttl     = 600
  records = ["${aws_ses_domain_identity.main.verification_token}"]
}
