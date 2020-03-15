#!/usr/bin/env bash
source ./.devops/definitions.sh

printf "${LBLUE}Deploy to DEV:${NC}\n"

printf "${LBLUE}1. Restart docker-compose via ssh${NC}\n"

cfgPath=$SERVER_DEPLOY_PATH/.devops/docker/docker-compose/development.yml

docker-compose -f $cfgPath stop $CONTAINER_NAME
docker pull "$IMAGE_NAME:$VERSION"
docker tag "$IMAGE_NAME:$VERSION" "$IMAGE_NAME:latest"
docker-compose -f $cfgPath up --remove-orphans -d $CONTAINER_NAME

printf "${LBLUE}Deploy to DEV completed${NC}\n"