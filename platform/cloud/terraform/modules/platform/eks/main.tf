module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = var.eks_cluster_name
  cluster_version = var.eks_cluster_version
  subnets         = var.vpc_private_subnets

  tags = {
    Environment = "dev"
    app = "technology-bank"
  }

  vpc_id = var.vpc_id

/*  worker_groups = [
    {
      name                          = "worker-group-1"
      instance_type                 = "t2.small"
      additional_userdata           = "echo foo bar"
      asg_desired_capacity          = 2
      additional_security_group_ids = [var.worker_group_mgmt_one_ids]
    },
    {
      name                          = "worker-group-2"
      instance_type                 = "t2.medium"
      additional_userdata           = "echo foo bar"
      additional_security_group_ids = [var.worker_group_mgmt_two_ids]
      asg_desired_capacity          = 1
    }
  ]*/

  node_groups_defaults = {
    ami_type  = "AL2_x86_64"
    disk_size = 50
    additional_tags = {
      app = "technology-bank"
    }
  }

  node_groups = {
    tech_bank_workers = {
      name = "technology_bank_workers"
      desired_capacity = 2
      max_capacity     = 4
      min_capacity     = 2

      instance_type = "t2.medium"
      k8s_labels = {
        Environment = "dev"
      }

    }
  }
}
