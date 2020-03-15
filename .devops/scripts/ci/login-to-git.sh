#!/usr/bin/env bash

git config --global push.default simple
git remote set-url origin https://$GIT_CI_USER:$GIT_CI_PWD@gitlab.ciklum.net/$CI_PROJECT_PATH.git
git config --global user.email "$GIT_CI_USER@ciklum.com"
git config --global user.name $GIT_CI_USER
