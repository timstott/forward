resource "aws_api_gateway_rest_api" "main" {
  name        = "${var.service}-${var.environment}-api"
  description = "API Gateway forward (${var.environment})"
}

# wiring order resource -> method -> integration

resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = "${aws_api_gateway_rest_api.main.id}"
  parent_id   = "${aws_api_gateway_rest_api.main.root_resource_id}"

  # match any request path
  path_part = "{proxy+}"
}

resource "aws_api_gateway_method" "proxy" {
  rest_api_id = "${aws_api_gateway_rest_api.main.id}"
  resource_id = "${aws_api_gateway_resource.proxy.id}"

  # allow any request method
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda" {
  rest_api_id = "${aws_api_gateway_rest_api.main.id}"
  resource_id = "${aws_api_gateway_method.proxy.resource_id}"
  http_method = "${aws_api_gateway_method.proxy.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.main.invoke_arn}"
}

resource "aws_api_gateway_deployment" "main" {
  depends_on = [
    "aws_api_gateway_integration.lambda",
  ]

  rest_api_id = "${aws_api_gateway_rest_api.main.id}"
  stage_name  = "${var.environment}"
}

resource "aws_api_gateway_base_path_mapping" "main" {
  api_id      = "${aws_api_gateway_rest_api.main.id}"
  stage_name  = "${aws_api_gateway_deployment.main.stage_name}"
  domain_name = "${aws_api_gateway_domain_name.main.domain_name}"
}
