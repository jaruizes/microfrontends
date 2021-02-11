
FROM node:latest

RUN npm install -g json-server
RUN mkdir /data

VOLUME /data

EXPOSE 3000
ENTRYPOINT ["json-server", "--routes", "data/routes.json", "--host", "0.0.0.0", "--watch", "data/api-mock.json"]
