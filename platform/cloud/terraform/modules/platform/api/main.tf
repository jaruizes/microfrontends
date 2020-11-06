resource "aws_api_gateway_rest_api" "microfrontends_api" {
  name = "TF Microfrontends"
  description = "TF - API Microfrontends"
  body = file("${path.module}/microfrontends-api-oas30_v2.json")
  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_deployment" "microfrontends_api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.microfrontends_api.id
  stage_name  = "api"
}


