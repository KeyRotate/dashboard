#!/bin/bash

MGMT_PORT=$1

npm run build
docker build -f docker/Dockerfile -t milian/dashboard-local:latest .

docker rm -f milian-dashboard
docker run -d --name milian-dashboard  \
  -p 3000:80 -p 443:443 \
  -e AUTH_AUDIENCE=http://localhost:3000/ \
  -e AUTH_AUTHORITY=https://dev-nu6lhydotqcmy4yq.us.auth0.com \
  -e AUTH_CLIENT_ID=XZivSlG52ytIIPffEakXiTNmjP7T5bAh  \
  -e USE_AUTH0=true \
  -e AUTH_SUPPORTED_SCOPES='openid profile email api offline_access email_verified' \
  -e MILIAN_MGMT_API_ENDPOINT=http://localhost:$MGMT_PORT  \
  -e MILIAN_MGMT_GRPC_API_ENDPOINT=http://localhost:$MGMT_PORT \
  milian/dashboard-local:latest