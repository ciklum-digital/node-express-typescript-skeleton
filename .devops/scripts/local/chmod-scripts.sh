#!/usr/bin/env bash
BLUE='\033[0;34m'
LBLUE='\033[1;36m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW=$(tput setaf 3)
NC='\033[0m' # No Color

function chmodFile () {
    if [ ! -f ${1} ]; then
        printf "${YELLOW}${1} not found${NC}\n";
        return
    fi

    printf "chmod +x ${1}";

    if chmod +x ${1}; then
        printf " ${GREEN}[OK]${NC}\n";
    else
        printf " ${RED}[Error]${NC}\n";
    fi
}

printf "${LBLUE}Gonna make all this scripts executable ...${NC}\n";

currDir="$(pwd)"
printf "Base dir: $currDir\n";

printf "${GREEN}./.devops/scripts/common/${NC}\n";
chmodFile ./.devops/scripts/common/check-env-vars.sh
#chmodFile ./.devops/scripts/local/load-env.sh
chmodFile ./.devops/scripts//local/build.sh

printf "${GREEN}./.devops/scripts/ci/${NC}\n";
chmodFile ./.devops/scripts/ci/bump-version.job.sh
chmodFile ./.devops/scripts/ci/bump-version.sh
chmodFile ./.devops/scripts/ci/cleanup-dugling.sh
chmodFile ./.devops/scripts/ci/docker-build.sh
chmodFile ./.devops/scripts/ci/get-latest-version.sh
chmodFile ./.devops/scripts/ci/image-push.sh
chmodFile ./.devops/scripts/ci/lint.job.sh
chmodFile ./.devops/scripts/ci/login-to-git.sh
chmodFile ./.devops/scripts/ci/login-to-registry.sh
chmodFile ./.devops/scripts/ci/semver.sh
chmodFile ./.devops/scripts/ci/test.job.sh

printf "${LBLUE}Done${NC}\n";
