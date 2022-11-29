terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

resource "aws_ecr_repository" "shannon-trust-repository" {
  name = "${local.aws_ecr_repository_name}"
}

resource "aws_cloudformation_stack" "network" {
  name = "${local.aws_vpc_stack_name}"
  template_body = "${file("cloudformation-templates/network.yml")}"
  parameters = {
    ECSClusterName = "${local.aws_ecs_cluster_name}"
    DomainName = "${local.api_domain}"
    HostedZoneId = "${var.HOSTED_ZONE_ID}"
    ServiceDiscoveryNamespace = "${local.service_discovery_namespace}"
  }
  capabilities = ["CAPABILITY_IAM"]
}

resource "aws_cloudformation_stack" "database" {
  name = "${local.aws_database_name}"
  template_body = "${file("cloudformation-templates/database.yml")}"
  parameters = {
    NetworkStackName = "${local.aws_vpc_stack_name}"
    DBInstanceClass = "${var.environment == "production" ? "db.t2.micro" : "db.t3.micro"}"
    DBName = "shannon"
    DBUsername = "shannon"
  }
  depends_on = [aws_cloudformation_stack.network]
}

resource "aws_cloudformation_stack" "sessionmanager" {
  name = "${local.aws_session_manager_name}"
  template_body = "${file("cloudformation-templates/sessionmanager.yml")}"
  parameters = {
    NetworkStackName = "${local.aws_vpc_stack_name}"
  }
  depends_on = [aws_cloudformation_stack.network, aws_cloudformation_stack.database]
  capabilities = ["CAPABILITY_IAM"]
}

resource "aws_cloudformation_stack" "service" {
  name = "${local.aws_ecs_service_name}"
  template_body = "${file("cloudformation-templates/service.yml")}"
  parameters = {
    NetworkStackName = "${local.aws_vpc_stack_name}"
    ServiceName = "${local.aws_ecs_service_name}"
    ClusterName = "${local.aws_ecs_cluster_name}"
    ImageUrl = "${var.backend_image_url}"
    ApplicationPort = 5005
    ContainerPort = 5005
    #Path = "/api"
    HealthCheckPath = "/api/health-check"
    HealthCheckIntervalSeconds = 150
    DatabaseStackName = "${local.aws_database_name}"
    ServerSecret = "${local.SERVER_SECRET}"
    ServiceDiscoveryNamespace = "${local.service_discovery_namespace}"
    SendgridApiKey: "${local.SENDGRID_API_KEY}"
    SendgridSenderEmail: "${local.SENDGRID_SENDER_EMAIL}"
    AppUrl: "${local.APP_URL}"
    SentryDns: "${local.sentry_dns}"
    RecaptchaSecretKey: "${local.recaptcha_secret_key}"
    BetteruptimeApiKey: "${local.betteruptime_api_key}"
  }
  depends_on = [aws_cloudformation_stack.network, aws_cloudformation_stack.database]
}

resource "aws_cloudformation_stack" "cloudtrail" {
  name = "${local.aws_cloudtrail_name}"
  template_body = "${file("cloudformation-templates/cloudtrail.yml")}"
}

resource "aws_cloudformation_stack" "guard_duty" {
  name = "${local.aws_guard_duty_name}"
  template_body = "${file("cloudformation-templates/guard_duty.yml")}"
  parameters = {
    #SecurityEmailAddress = "${var.security_email_address}"
  }
}

resource "aws_cloudformation_stack" "cloudfront" {
  name = "${local.aws_cloud_front_name}"
  template_body = "${file("cloudformation-templates/cloudfront.yml")}"
  parameters = {
    DomainName = "${local.app_domain}"
    HostedZoneId = "${var.HOSTED_ZONE_ID}"
  }
}

