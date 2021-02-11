

resource "aws_cognito_user_pool" "microfrontends_user_pool" {
  name = "TF-Microfrontends"
  alias_attributes = null
  auto_verified_attributes= []
  
  password_policy {
    minimum_length = 8
    require_lowercase = true
    require_numbers = true
    require_symbols = false
    require_uppercase = false
    temporary_password_validity_days = 7
  }

  admin_create_user_config {
    allow_admin_create_user_only = true
  }

  schema {
    attribute_data_type= "String"
    developer_only_attribute= false
    mutable= true
    name= "email"
    required= true
    string_attribute_constraints {
      max_length= 2048
      min_length= 0
    }
  }

  schema {
    attribute_data_type= "String"
    developer_only_attribute= false
    mutable= true
    name= "name"
    required= true
    string_attribute_constraints {
      max_length= 2048
      min_length= 0
    }
  }

  schema {
    attribute_data_type= "String"
    developer_only_attribute= false
    mutable= true
    name= "nickname"
    required= true
    string_attribute_constraints {
      max_length= 2048
      min_length= 0
    }
  }

  schema {
    attribute_data_type= "String"
    developer_only_attribute= false
    mutable= true
    name= "customerid"
    required= false
    string_attribute_constraints {
      max_length= 2048
      min_length= 0
    }
  }

  username_configuration {
    case_sensitive = true
  }

}

resource "null_resource" "cognito_user" {

  triggers = {
    user_pool_id = aws_cognito_user_pool.microfrontends_user_pool.id
  }

  provisioner "local-exec" {
    command = "aws --profile serverless cognito-idp admin-create-user --user-pool-id ${aws_cognito_user_pool.microfrontends_user_pool.id} --username customer1 --temporary-password customer1"
  }

  provisioner "local-exec" {
    command = "aws --profile serverless cognito-idp admin-set-user-password --user-pool-id ${aws_cognito_user_pool.microfrontends_user_pool.id} --username customer1 --password sopra1234 --permanent"
  }

  provisioner "local-exec" {
    command = "aws --profile serverless cognito-idp admin-update-user-attributes --user-pool-id ${aws_cognito_user_pool.microfrontends_user_pool.id} --username customer1 --user-attributes Name=nickname,Value=Fernando"
  }

  provisioner "local-exec" {
    command = "aws --profile serverless cognito-idp admin-update-user-attributes --user-pool-id ${aws_cognito_user_pool.microfrontends_user_pool.id} --username customer1 --user-attributes Name=custom:customerid,Value=0001"
  }

  provisioner "local-exec" {
    command = "aws --profile serverless cognito-idp admin-create-user --user-pool-id ${aws_cognito_user_pool.microfrontends_user_pool.id} --username customer2 --temporary-password customer1"
  }

  provisioner "local-exec" {
    command = "aws --profile serverless cognito-idp admin-set-user-password --user-pool-id ${aws_cognito_user_pool.microfrontends_user_pool.id} --username customer2 --password sopra1234 --permanent"
  }

  provisioner "local-exec" {
    command = "aws --profile serverless cognito-idp admin-update-user-attributes --user-pool-id ${aws_cognito_user_pool.microfrontends_user_pool.id} --username customer2 --user-attributes Name=nickname,Value=Nicolás"
  }

  provisioner "local-exec" {
    command = "aws --profile serverless cognito-idp admin-update-user-attributes --user-pool-id ${aws_cognito_user_pool.microfrontends_user_pool.id} --username customer2 --user-attributes Name=custom:customerid,Value=0002"
  }

  provisioner "local-exec" {
    command = "aws --profile serverless cognito-idp admin-create-user --user-pool-id ${aws_cognito_user_pool.microfrontends_user_pool.id} --username admin --temporary-password customer1"
  }

  provisioner "local-exec" {
    command = "aws --profile serverless cognito-idp admin-set-user-password --user-pool-id ${aws_cognito_user_pool.microfrontends_user_pool.id} --username admin --password sopra1234 --permanent"
  }
}

resource "aws_cognito_user_pool_client" "customers_client" {
  name = "customers"

  user_pool_id = aws_cognito_user_pool.microfrontends_user_pool.id
  allowed_oauth_flows = ["code"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes = ["email", "openid", "aws.cognito.signin.user.admin", "profile"]
  explicit_auth_flows = ["ALLOW_REFRESH_TOKEN_AUTH"]
  prevent_user_existence_errors = "ENABLED"
  read_attributes = [
    "address",
    "birthdate",
    "email",
    "email_verified",
    "family_name",
    "gender",
    "given_name",
    "locale",
    "middle_name",
    "name",
    "nickname",
    "phone_number",
    "phone_number_verified",
    "picture",
    "preferred_username",
    "profile",
    "updated_at",
    "website",
    "zoneinfo",
    "custom:customerid"
  ]
  write_attributes = [
    "address",
    "birthdate",
    "email",
    "family_name",
    "gender",
    "given_name",
    "given_name",
    "locale",
    "middle_name",
    "name",
    "nickname",
    "phone_number",
    "picture",
    "preferred_username",
    "profile",
    "updated_at",
    "website",
    "zoneinfo",
    "custom:customerid"
  ]
  refresh_token_validity = 30
  supported_identity_providers = ["COGNITO"]

  callback_urls = ["http://localhost:4200/login", "https://${var.customers_cf_url}/login"]
  logout_urls = ["http://localhost:4200/logout", "https://${var.customers_cf_url}/logout"]
  generate_secret = false
}

resource "aws_cognito_user_pool_client" "backoffice_client" {
  name = "backoffice"

  user_pool_id = aws_cognito_user_pool.microfrontends_user_pool.id
  allowed_oauth_flows = ["code"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes = ["email", "openid", "aws.cognito.signin.user.admin", "profile"]
  explicit_auth_flows = ["ALLOW_REFRESH_TOKEN_AUTH"]
  prevent_user_existence_errors = "ENABLED"
  read_attributes = [
    "address",
    "birthdate",
    "email",
    "email_verified",
    "family_name",
    "gender",
    "given_name",
    "locale",
    "middle_name",
    "name",
    "nickname",
    "phone_number",
    "phone_number_verified",
    "picture",
    "preferred_username",
    "profile",
    "updated_at",
    "website",
    "zoneinfo"
  ]
  write_attributes = [
    "address",
    "birthdate",
    "email",
    "family_name",
    "gender",
    "given_name",
    "locale",
    "middle_name",
    "name",
    "nickname",
    "phone_number",
    "picture",
    "preferred_username",
    "profile",
    "updated_at",
    "website",
    "zoneinfo"
  ]
  refresh_token_validity = 30
  supported_identity_providers = ["COGNITO"]

  callback_urls = ["http://localhost:4250/login", "https://${var.backoffice_cf_url}/login"]
  logout_urls = ["http://localhost:4250/logout", "https://${var.backoffice_cf_url}/logout"]
  generate_secret = false
}

resource "aws_cognito_user_pool_client" "broker_client" {
  name = "broker"

  user_pool_id = aws_cognito_user_pool.microfrontends_user_pool.id
  allowed_oauth_flows = ["code"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes = ["email", "openid", "aws.cognito.signin.user.admin", "profile"]
  explicit_auth_flows = ["ALLOW_REFRESH_TOKEN_AUTH"]
  prevent_user_existence_errors = "ENABLED"
  read_attributes = [
    "address",
    "birthdate",
    "email",
    "email_verified",
    "family_name",
    "gender",
    "given_name",
    "locale",
    "middle_name",
    "name",
    "nickname",
    "phone_number",
    "phone_number_verified",
    "picture",
    "preferred_username",
    "profile",
    "updated_at",
    "website",
    "zoneinfo"
  ]
  write_attributes = [
    "address",
    "birthdate",
    "email",
    "family_name",
    "gender",
    "given_name",
    "locale",
    "middle_name",
    "name",
    "nickname",
    "phone_number",
    "picture",
    "preferred_username",
    "profile",
    "updated_at",
    "website",
    "zoneinfo"
  ]
  refresh_token_validity = 30
  supported_identity_providers = ["COGNITO"]

  callback_urls = ["http://localhost:4280/shares", "https://${var.backoffice_cf_url}/shares"]
  logout_urls = ["http://localhost:4280", "https://${var.backoffice_cf_url}"]
  generate_secret = false
}

resource "aws_cognito_user_pool_domain" "microfrontends" {
  domain       = "technology-bank"
  user_pool_id = aws_cognito_user_pool.microfrontends_user_pool.id
}
