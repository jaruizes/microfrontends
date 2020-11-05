output "user_pool_id" {
  value       = aws_cognito_user_pool.user_pool.id
  description = "The id of the Cognito User Pool"
}

output "customers_client_id" {
  value       = aws_cognito_user_pool_client.customers_client.id
  description = "The id of the Customers Client"
}

output "backoffice_id" {
  value       = aws_cognito_user_pool_client.backoffice_client.id
  description = "The id of the Customers Client"
}
