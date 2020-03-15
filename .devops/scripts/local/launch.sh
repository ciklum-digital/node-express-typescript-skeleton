#!/usr/bin/env bash

envFile="./.devops/configs/local.env"

env-cmd -f $envFile ./.devops/scripts/common/check-env-vars.sh
env-cmd -f $envFile nodemon --inspect