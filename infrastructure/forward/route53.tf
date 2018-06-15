data "aws_route53_zone" "main" {
  name = "${var.hosted_zone}"
}

resource "aws_route53_record" "main" {
  zone_id = "${data.aws_route53_zone.main.zone_id}"
  name    = "${aws_acm_certificate.main.domain_name}"
  type    = "A"

  alias {
    name                   = "${aws_api_gateway_domain_name.main.cloudfront_domain_name}"
    zone_id                = "${aws_api_gateway_domain_name.main.cloudfront_zone_id}"
    evaluate_target_health = false
  }
}

# START Certificate
resource "aws_acm_certificate" "main" {
  domain_name       = "${var.environment}.${var.service}.${var.hosted_zone}"
  validation_method = "DNS"
  provider          = "aws.acm"
}

resource "aws_route53_record" "certificate_validation" {
  name    = "${aws_acm_certificate.main.domain_validation_options.0.resource_record_name}"
  type    = "${aws_acm_certificate.main.domain_validation_options.0.resource_record_type}"
  zone_id = "${data.aws_route53_zone.main.id}"
  records = ["${aws_acm_certificate.main.domain_validation_options.0.resource_record_value}"]
  ttl     = 600
}

resource "aws_acm_certificate_validation" "main" {
  certificate_arn         = "${aws_acm_certificate.main.arn}"
  validation_record_fqdns = ["${aws_route53_record.certificate_validation.fqdn}"]
  provider                = "aws.acm"
}

resource "aws_api_gateway_domain_name" "main" {
  domain_name     = "${aws_acm_certificate.main.domain_name}"
  certificate_arn = "${aws_acm_certificate.main.arn}"
}
