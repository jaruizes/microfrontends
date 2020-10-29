provider "aws" {
  region = "eu-west-2"
  profile = "serverless"
}

/*
module "customers" {
  source = "./modules/applications/customers"
}

module "backoffice" {
  source = "./modules/applications/backoffice"
}

module "storybook" {
  source = "./modules/applications/storybook"
}

module "api" {
  source = "./modules/platform/api"
}
*/


/*** PLATFORM ***/
module "api" {
  source = "./modules/platform/api"
}

module "microfrontends" {
  source = "./modules/applications/microfrontends"
}

module "backoffice" {
  api_id = module.api.api_id
  source = "./modules/applications/backoffice"

  depends_on = [module.api, module.microfrontends]
}

module "storybook" {
  api_id = module.api.api_id
  source = "./modules/applications/storybook"

  depends_on = [module.api, module.microfrontends]
}

module "customers" {
  api_id = module.api.api_id
  source = "./modules/applications/customers"

  depends_on = [module.api, module.microfrontends]
}

module "cognito" {
  source = "./modules/platform/cognito"
  customers_cf_url = module.customers.distribution_domain
  backoffice_cf_url = module.backoffice.distribution_domain

  depends_on = [module.customers, module.backoffice]
}

output "cognito_pool_id" {
  value = module.cognito.user_pool_id
}

output "customers_client_id" {
  value = module.cognito.customers_client_id
}

output "backoffice_client_id" {
  value = module.cognito.backoffice_id
}

output "api_id" {
  value = module.api.api_id
}
