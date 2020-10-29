output "distribution_domain" {
  value       = aws_cloudfront_distribution.customers_distribution.domain_name
  description = "The domain of the distribution"
}
