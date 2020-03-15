#!/usr/bin/env bash

envFile="./.devops/configs/local.env"

env-cmd -f $envFile node ./dist/svc/bundle.js