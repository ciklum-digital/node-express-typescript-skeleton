#!/usr/bin/env bash

BLUE='\033[0;34m'
LBLUE='\033[1;36m'
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

if [ -f '.env' ]; then
    printf "Gonna load root .env file ";
    source '.env' && \
    export $(grep -o '^[^#]*' .env);

    if [ $? -eq 0 ]; then
        printf "${GREEN}[Ok]${NC}\n";
    else
        printf "${RED}[Error]${NC}\n";
        exit 1;
    fi
else
    printf "${RED}No .env file found in: ${NC}$PWD\n"
    exit 1;
fi
