#!/usr/bin/env bash

if [ "$(docker ps -qa -f name='microfrontend-base')" ]; then
    docker rm microfrontend-base --force
fi

docker run -p 8080:80 --name microfrontend-base -v $(pwd)/dist/microfrontend-base/v1:/usr/share/nginx/html:ro -v $(pwd)/nginx-conf:/etc/nginx/conf.d:ro -d nginx

