#!/bin/bash

BLUE='\033[0;34m'
LBLUE='\033[1;36m'
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

printf "${LBLUE}Removing dangling images...${NC}\n"
docker images -f "dangling=true" -q | xargs docker rmi

printf "${GREEN}Done${NC}\n"