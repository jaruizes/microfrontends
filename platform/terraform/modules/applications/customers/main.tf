// Bucket for customers application
resource "aws_s3_bucket" "customers-bucket" {
  bucket = "microfrontends-applications-customers"
  acl    = "public-read-write"
  policy = file("${path.module}/bucket-policy.json")

  website {
    index_document = "index.html"
  }
}

// Bucket for customers application
resource "aws_s3_bucket_public_access_block" "customers-bucket" {
  bucket = aws_s3_bucket.customers-bucket.id

  block_public_acls   = false
  block_public_policy = false
  ignore_public_acls = false
  restrict_public_buckets = false
}

resource "aws_cloudfront_distribution" "customers_distribution" {

  // Origin application
  origin {
    domain_name = aws_s3_bucket.customers-bucket.bucket_regional_domain_name
    origin_id   = "S3-microfrontends-applications-customers"
  }

  // Origin microfrontends & webcomponents
  origin {
    domain_name = "microfrontends-bucket.s3.amazonaws.com"
    origin_id   = "S3-microfrontends-bucket"
  }

  // Origin API
  origin {
    domain_name = "${var.api_id}.execute-api.eu-west-2.amazonaws.com"
    origin_id   = "Custom-${var.api_id}.execute-api.eu-west-2.amazonaws.com"
    custom_origin_config {
      http_port = 80
      https_port = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols = ["TLSv1"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "TF: Microfrontends (Customers App)"
  default_root_object = "index.html"

  logging_config {
    include_cookies = false
    bucket          = aws_s3_bucket.customers-bucket.bucket_regional_domain_name
    prefix          = "cf-logs/"
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-microfrontends-applications-customers"

    forwarded_values {
      query_string = true

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # Behaviour API
  ordered_cache_behavior {
    path_pattern     = "/api/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "Custom-${var.api_id}.execute-api.eu-west-2.amazonaws.com"

    forwarded_values {
      query_string = true

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
    compress               = true
    viewer_protocol_policy = "allow-all"
  }

  # Behaviour microfrontends
  ordered_cache_behavior {
    path_pattern     = "/microfrontends/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "S3-microfrontends-bucket"

    forwarded_values {
      query_string = true

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
    compress               = false
    viewer_protocol_policy = "allow-all"
  }

  # Behaviour assets/microfrontends
  ordered_cache_behavior {
    path_pattern     = "/assets/microfrontends/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "S3-microfrontends-bucket"

    forwarded_values {
      query_string = true

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
    compress               = false
    viewer_protocol_policy = "allow-all"
  }

  # Behaviour webcomponents
  ordered_cache_behavior {
    path_pattern     = "/webcomponents/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "S3-microfrontends-bucket"

    forwarded_values {
      query_string = true

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
    compress               = false
    viewer_protocol_policy = "allow-all"
  }

  # Behaviour assets/webcomponents
  ordered_cache_behavior {
    path_pattern     = "/assets/webcomponents/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "S3-microfrontends-bucket"

    forwarded_values {
      query_string = true

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
    compress               = false
    viewer_protocol_policy = "allow-all"
  }


  price_class = "PriceClass_100"

  custom_error_response {
    error_code = 403
    response_code = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code = 404
    response_code = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Application = "microfrontends"
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
