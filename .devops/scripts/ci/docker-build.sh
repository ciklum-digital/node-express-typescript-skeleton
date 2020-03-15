#!/usr/bin/env bash

source ./.devops/definitions.sh

source ./.devops/scripts/ci/get-latest-version.sh

docker build -f "./.devops/docker/Dockerfile" -t $IMAGE_NAME:$VERSION -t $IMAGE_NAME:latest .
