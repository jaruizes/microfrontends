provider "aws" {
  region = "eu-west-2"
  profile = "serverless"
}

provider "kubernetes" {
  load_config_file       = "false"
  host                   = data.aws_eks_cluster.cluster.endpoint
  token                  = data.aws_eks_cluster_auth.cluster.token
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority.0.data)
}

data "aws_eks_cluster" "cluster" {
  name = module.eks.cluster_id
}

data "aws_eks_cluster_auth" "cluster" {
  name = module.eks.cluster_id
}

locals {
  bucket_prefix = "technology-bank"
  cluster_name = "technology-bank_eks"
}


/*module "api" {
  source = "./modules/platform/api"
}

module "microfrontends" {
  bucket_prefix = local.bucket_prefix
  source = "./modules/applications/microfrontends"
}

module "backoffice" {
  api_id = module.api.api_id
  bucket_prefix = local.bucket_prefix
  source = "./modules/applications/backoffice"

  depends_on = [module.api, module.microfrontends]
}

module "storybook" {
  api_id = module.api.api_id
  bucket_prefix = local.bucket_prefix
  source = "./modules/applications/storybook"

  depends_on = [module.api, module.microfrontends]
}

module "customers" {
  api_id = module.api.api_id
  bucket_prefix = local.bucket_prefix
  source = "./modules/applications/customers"

  depends_on = [module.api, module.microfrontends]
}

module "broker" {
  api_id = module.api.api_id
  bucket_prefix = local.bucket_prefix
  source = "./modules/applications/broker"

  depends_on = [module.api, module.microfrontends]
}

module "cognito" {
  source = "./modules/platform/cognito"
  customers_cf_url = module.customers.distribution_domain
  backoffice_cf_url = module.backoffice.distribution_domain

  depends_on = [module.customers, module.backoffice]
}*/

module "vpc" {
  source = "./modules/platform/vpc"
  eks_cluster_name = local.cluster_name
}

module "security_groups" {
  source = "./modules/platform/security_groups"
  vpc_id = module.vpc.id
}

module "eks" {
  source = "./modules/platform/eks"
  eks_cluster_name = local.cluster_name
  vpc_id = module.vpc.id
  vpc_private_subnets = module.vpc.private_subnets
  worker_group_mgmt_one_ids = [module.security_groups.worker_group_mgmt_one_ids]
  worker_group_mgmt_two_ids = [module.security_groups.worker_group_mgmt_two_ids]
  eks_cluster_version = "1.17"
}

module "postgresql" {
  source = "./modules/platform/postgres"
  vpc_id = module.vpc.id
  vpc_database_subnets = module.vpc.database_subnets
  vpc_public_subnets = module.vpc.public_subnets
}

/*output "cognito_pool_id" {
  value = module.cognito.user_pool_id
}

output "customers_client_id" {
  value = module.cognito.customers_client_id
}

output "backoffice_client_id" {
  value = module.cognito.backoffice_client_id
}

output "broker_client_id" {
  value = module.cognito.broker_client_id
}

output "api_id" {
  value = module.api.api_id
}*/

output "vpc_id" {
  value = module.vpc.id
}

output "cluster_id" {
  value = module.eks.cluster_id
}
