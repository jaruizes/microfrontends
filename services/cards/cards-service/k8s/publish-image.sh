export AWS_PROFILE=serverless
aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 297906742605.dkr.ecr.eu-west-2.amazonaws.com
docker tag cards-service:latest 297906742605.dkr.ecr.eu-west-2.amazonaws.com/cards-service:latest
docker push 297906742605.dkr.ecr.eu-west-2.amazonaws.com/cards-service:latest