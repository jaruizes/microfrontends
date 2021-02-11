output "accounts-service-repository-url" {
  description = "Repository URL"
  value       = aws_ecr_repository.accounts-service.repository_url
}

output "cards-service-repository-url" {
  description = "Repository URL"
  value       = aws_ecr_repository.cards-service.repository_url
}

output "customers-service-repository-url" {
  description = "Repository URL"
  value       = aws_ecr_repository.customers-service.repository_url
}
