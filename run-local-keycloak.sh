#!/bin/bash

MGMT_PORT=$1

npm run build
docker build -f docker/Dockerfile -t milian/dashboard-local:latest .

docker rm -f milian-dashboard
docker run -d --name milian-dashboard  \
  -p 3000:80 -p 443:443 \
  -e AUTH_AUDIENCE=milian-client  \
  -e AUTH_AUTHORITY=http://localhost:8080/realms/milian  \
  -e AUTH_CLIENT_ID=milian-client \
  -e USE_AUTH0=false  \
  -e AUTH_SUPPORTED_SCOPES='openid profile email api offline_access' \
  -e MILIAN_MGMT_API_ENDPOINT=http://localhost:$MGMT_PORT  \
  -e MILIAN_MGMT_GRPC_API_ENDPOINT=http://localhost:$MGMT_PORT \
  milian/dashboard-local:latest