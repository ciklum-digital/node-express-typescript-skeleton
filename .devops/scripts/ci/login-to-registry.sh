#!/bin/bash
BLUE='\033[0;34m'
LBLUE='\033[1;36m'
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

source ./.devops/definitions.sh

printf "${LBLUE}Login to registry:${NC} ${DOCKER_REGISTRY_HOST}\n"
docker login -u="$DOCKER_REGISTRY_USER" -p="$DOCKER_REGISTRY_PWD" $DOCKER_REGISTRY_HOST
printf "${LBLUE}Login to registry finished${NC}\n"