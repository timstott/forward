resource "aws_lambda_function" "main" {
  function_name = "${var.service}-${var.environment}-application"
  filename = "${path.module}/dummy.zip"

  handler = "main"
  runtime = "go1.x"

  memory_size = 128

  role = "${aws_iam_role.runtime.arn}"

  environment {
    variables {
      GIN_MODE = "release"
    }
  }
}

# allow lambda to access API Gateway
resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.main.arn}"
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_deployment.main.execution_arn}/*/*"
}
