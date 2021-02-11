variable "vpc_database_subnets" {
  description = "The list of the database subnets"
  type        = list(string)
}

variable "vpc_public_subnets" {
  description = "The list of the public subnets"
  type        = list(string)
}

variable "vpc_id" {
  description = "VPC id"
  type        = string
}
