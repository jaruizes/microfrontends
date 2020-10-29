output "distribution_domain" {
  value       = aws_cloudfront_distribution.storybook_distribution.domain_name
  description = "The domain of the distribution"
}
