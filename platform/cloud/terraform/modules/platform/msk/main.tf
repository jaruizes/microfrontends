data "aws_availability_zones" "azs" {
  state = "available"
}

resource "aws_subnet" "subnet_az1" {
  availability_zone = data.aws_availability_zones.azs.names[0]
  cidr_block        = "10.0.10.0/24"
  vpc_id            = var.vpc_id
  tags = {
    app = "technology-bank"
  }
}

resource "aws_subnet" "subnet_az2" {
  availability_zone = data.aws_availability_zones.azs.names[1]
  cidr_block        = "10.0.11.0/24"
  vpc_id            = var.vpc_id
  tags = {
    app = "technology-bank"
  }
}

resource "aws_subnet" "subnet_az3" {
  availability_zone = data.aws_availability_zones.azs.names[2]
  cidr_block        = "10.0.12.0/24"
  vpc_id            = var.vpc_id
  tags = {
    app = "technology-bank"
  }
}

resource "aws_security_group" "sg" {
  vpc_id = var.vpc_id
}

resource "aws_msk_cluster" "msk_cluster" {
  cluster_name           = "technology-bank-msk"
  kafka_version          = "2.6.0"
  number_of_broker_nodes = 3

  broker_node_group_info {
    instance_type   = "kafka.m5.large"
    ebs_volume_size = 1000
    client_subnets = [
      aws_subnet.subnet_az1.id,
      aws_subnet.subnet_az2.id,
      aws_subnet.subnet_az3.id,
    ]
    security_groups = [aws_security_group.sg.id]
  }

  open_monitoring {
    prometheus {
      jmx_exporter {
        enabled_in_broker = true
      }
      node_exporter {
        enabled_in_broker = true
      }
    }
  }

  tags = {
    foo = "bar"
  }
}
