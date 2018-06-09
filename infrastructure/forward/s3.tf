# deployment bucket
resource "aws_s3_bucket" "deployment" {
  bucket = "${var.service}-${var.environment}-deployments"

  lifecycle {
    prevent_destroy = true
  }

  tags {
    stage   = "${var.environment}"
    service = "${var.service}"
  }
}
