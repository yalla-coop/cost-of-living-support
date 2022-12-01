locals {
  # active region
  aws_region = "${var.aws_region}"
  # The name of the CloudTrail service
  bucket_name = "${var.aws_resource_prefix}-cloudtrail"
  # Staging bucket name
  aws_cloudtrail_name = "${var.aws_resource_prefix}-cloudtrail"
}