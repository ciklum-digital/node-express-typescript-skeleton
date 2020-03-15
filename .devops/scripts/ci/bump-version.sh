#!/usr/bin/env bash

BLUE='\033[0;34m'
LBLUE='\033[1;36m'
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

BUMP="$(echo "$1" | tr '[:upper:]' '[:lower:]')"

source ./.devops/definitions.sh
source ./.devops/scripts/ci/get-latest-version.sh

if [ "$BUMP" != "major" ] && [ "$BUMP" != "minor" ] && [ "$BUMP" != "patch" ]; then
    echo "ERROR: first param should be = major|minor|patch";
    exit 1;
fi

printf "Gonna bump version changes as ${LBLUE}[$BUMP]${NC} for [$VERSION]\n";

printf "Bumping version...\n";

export VERSION=$(./.devops/scripts/ci/semver.sh bump $BUMP $VERSION)

jq '.version=env.VERSION' ./package.json > /tmp/tmp.$$.json && mv /tmp/tmp.$$.json ./package.json

git add .
git commit -m "$VERSION" --no-verify
git tag -a "v$VERSION" -m "$VERSION"
git push origin HEAD:master --tags
