locals {
  # active region
  aws_region = "${var.aws_region}"
  # Bucket name
  aws_bucket_name = "${var.aws_resource_prefix}-${var.environment}"
}