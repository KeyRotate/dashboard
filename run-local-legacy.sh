#!/bin/bash

MGMT_PORT=$1

npm run build
docker build -f docker/Dockerfile -t milian/dashboard-local:latest .

docker rm -f milian-dashboard
docker run -d --name milian-dashboard  \
 -p 3000:80 -p 443:443  \
 -e AUTH0_AUDIENCE=http://localhost:3000/ \
 -e AUTH0_DOMAIN=dev-nu6lhydotqcmy4yq.us.auth0.com  \
 -e AUTH0_CLIENT_ID=XZivSlG52ytIIPffEakXiTNmjP7T5bAh  \
 -e MILIAN_MGMT_API_ENDPOINT=http://localhost:$MGMT_PORT  \
 -e MILIAN_MGMT_GRPC_API_ENDPOINT=http://localhost:$MGMT_PORT  \
 milian/dashboard-local:latest
