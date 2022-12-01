locals {
  # active region
  aws_region = "${var.aws_region}"
  # The name of the S3 bucket
  aws_bucket_name = "${var.aws_resource_prefix}-${var.aws_resource_prefix}"
  # The name of the S3 bucket user
  aws_bucket_user_name = "${var.aws_resource_prefix}-${var.aws_resource_prefix}-s3"
}