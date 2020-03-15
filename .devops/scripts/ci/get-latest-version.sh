#!/usr/bin/env bash

function getLatestVersion {
  if [ "$(command -v git)" ]; then
    latestTag="$(git describe --abbrev=0 --tags)"
    prefix="v"
    latestVer="${latestTag#"$prefix"}"
  else
    latestVer=""
  fi;

  if [ ! "$latestVer" ]; then
    latestVer=`jsonValue package.json version`
  fi;

  echo $latestVer
}

function jsonValue {
  UNAMESTR=`uname`
  if [[ "$UNAMESTR" == 'Darwin' ]]; then
    SED_EXTENDED='-E'
  else
      SED_EXTENDED='-r'
  fi;

  VALUE=`grep -m 1 "\"${2}\"" ${1} | sed ${SED_EXTENDED} 's/^ *//;s/.*: *"//;s/",?//'`

  if [ ! "$VALUE" ]; then
    echo "Error: Cannot find \"${2}\" in ${1}" >&2;
    exit 1;
  else
    echo $VALUE ;
  fi;
}

VERSION=$(getLatestVersion)
