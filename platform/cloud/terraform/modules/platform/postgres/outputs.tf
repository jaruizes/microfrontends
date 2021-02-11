output "bastion_public_ip" {
  description = "Bastion public IP"
  value       = aws_instance.techbank-db-bastion.public_ip
}
