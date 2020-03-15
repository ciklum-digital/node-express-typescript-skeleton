#!/usr/bin/env bash

docker run \
    -e npm_config_cache=/cache/npm \
    -v npm-cache:/cache/npm \
    -v $PWD:/tmp/src \
    --name $CI_JOB_ID \
    node:12 /bin/bash -c \
    "mkdir /tmp/build  && cp -a /tmp/src/. /tmp/build/ && cd /tmp/build && npm ci && npm run test:coverage"