locals {
  # active region
  aws_region = "${var.aws_region}"
  # The name of the CloudTrail service
  aws_cloudtrail_name = "${var.aws_resource_prefix}-cloudtrail"
}