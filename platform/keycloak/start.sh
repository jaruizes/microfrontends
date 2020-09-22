docker run -p 8080:8080 \
-e KEYCLOAK_USER=admin \
-e KEYCLOAK_PASSWORD=admin \
-e KEYCLOAK_IMPORT=/tmp/microfrontends.json \
-v $(pwd)/realm:/tmp \
--name keycloak \
quay.io/keycloak/keycloak:11.0.2
