// Bucket for storybook application
resource "aws_s3_bucket" "microfrontends-bucket" {
  bucket = "microfrontends-bucket"
  acl    = "public-read-write"
  policy = file("${path.module}/bucket-policy.json")

  website {
    index_document = "index.html"
  }
}

// Bucket for storybook application
resource "aws_s3_bucket_public_access_block" "storybook-bucket" {
  bucket = aws_s3_bucket.microfrontends-bucket.id

  block_public_acls   = true
  block_public_policy = true
  ignore_public_acls = true
  restrict_public_buckets = true
}
