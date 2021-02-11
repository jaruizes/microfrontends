data "http" "myip" {
  url = "https://api.myip.com"
}

resource "aws_db_subnet_group" "postgres-subnet" {
  name       = "technology-bank-db-sbnetgroup"
  subnet_ids = var.vpc_database_subnets
}

resource "aws_db_instance" "techbank-db" {
  identifier = "techbank-db"
  allocated_storage = 10
  backup_retention_period = 0
  enabled_cloudwatch_logs_exports = [
    "postgresql"]
  storage_type = "gp2"
  engine = "postgres"
  engine_version = "12.3"
  instance_class = "db.t3.small"
  multi_az = false
  name = "technologybankdb"
  performance_insights_enabled = false
  username = "techbank"
  password = "techbank21"
  db_subnet_group_name = aws_db_subnet_group.postgres-subnet.name
  port = 5432
  skip_final_snapshot = true

  tags = {
    "group" = "technology-sp"
    "app" = "technology-bank"
  }
}


resource "aws_security_group" "techbank-db-bastion-security-group" {
  name        = "techbank_db_bastion_security-group"
  vpc_id      = var.vpc_id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["${lookup(jsondecode(data.http.myip.body), "ip")}/32"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    "group" = "technology-sp"
    "app" = "technology-bank"
  }
}

resource "aws_instance" "techbank-db-bastion" {
  ami                         = "ami-0271d331ac7dab654"   // AWS AMI
  instance_type               = "t2.micro"
  associate_public_ip_address = true
  subnet_id = var.vpc_public_subnets[0]
  key_name = "terraform"
  vpc_security_group_ids = [aws_security_group.techbank-db-bastion-security-group.id]

  tags = {
    "group" = "technology-sp"
    "app" = "technology-bank"
  }
}
