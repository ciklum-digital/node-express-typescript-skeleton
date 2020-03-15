#!/usr/bin/env bash
baseDir=${PWD}
echo $baseDir
envFile="$baseDir/.devops/configs/local.env"
echo $envFile
env-cmd -f $envFile ./.devops/scripts/common/check-env-vars.sh
env-cmd -f $envFile webpack --config ./webpack.config.js --mode development
