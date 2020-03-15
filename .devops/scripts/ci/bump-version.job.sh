#!/usr/bin/env bash

if [[ -n "${IS_CI_RUNNER-}" ]] ; then
    echo 'skip load .env file'
else
    source ./.devops/scripts/common/load-env.sh
fi

bumpAction=patch
desc=$(echo "$CI_COMMIT_DESCRIPTION" | sed -r '/^\s*$/d' | awk '{print tolower($0)}')

if [[ $desc =~ minor.* ]] ; then
    bumpAction=minor
fi
if [[ $desc =~ major.* ]] ; then
    bumpAction=major
fi

./.devops/scripts/ci/login-to-git.sh
./.devops/scripts/ci/bump-version.sh $bumpAction
