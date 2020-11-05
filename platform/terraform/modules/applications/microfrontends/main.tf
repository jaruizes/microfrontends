data "template_file" "policy" {
  template = file("${path.module}/bucket-policy.json")

  vars = {
    bucket_prefix = var.bucket_prefix
  }
}

// Bucket for microfrontends
resource "aws_s3_bucket" "microfrontends-bucket" {
  bucket = "${var.bucket_prefix}-microfrontends-bucket"
  acl    = "public-read-write"
  policy = data.template_file.policy.rendered

  website {
    index_document = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "microfrontends-bucket-access" {
  bucket = aws_s3_bucket.microfrontends-bucket.id

  block_public_acls   = true
  block_public_policy = true
  ignore_public_acls = true
  restrict_public_buckets = true
}
