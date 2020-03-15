#!/usr/bin/env bash
set -e

BLUE='\033[0;34m'
LBLUE='\033[1;36m'
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

if [[ -n "${IS_CI_RUNNER-}" ]] ; then
    echo 'skip loading .env'
else
    source ./.devops/scripts/common/load-env.sh
fi

source ./.devops/definitions.sh
source ./.devops/scripts/ci/get-latest-version.sh

docker login --username $DOCKER_REGISTRY_USER --password $DOCKER_REGISTRY_PWD $DOCKER_REGISTRY

docker push $IMAGE_NAME:$VERSION
docker push $IMAGE_NAME:latest
