data "aws_iam_policy_document" "deployment" {
  statement {
    actions = [
      "s3:PutObject",
    ]

    resources = [
      "${aws_s3_bucket.deployment.arn}/*",
    ]
  }
}

resource "aws_iam_user" "deployment" {
  name = "${var.service}-${var.environment}-deploy"

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_iam_policy" "deployment" {
  name   = "${var.service}-${var.environment}-deployment.access-policy"
  policy = "${data.aws_iam_policy_document.deployment.json}"
}

resource "aws_iam_policy_attachment" "deployment" {
  name       = "deployment"
  users      = ["${aws_iam_user.deployment.name}"]
  policy_arn = "${aws_iam_policy.deployment.arn}"
}
