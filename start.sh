#!/bin/bash

if [ ! -d "node_modules" ]; then
  echo "Installing dependencies. Please wait..."

  npm install

  installError=$?
  if [ $installError != 0 ]; then
  	echo "Installation returned with error code: $installError"
  	echo "Please ensure node and npm are in PATH, and npm is not blocked from accessing network"
  	rm -Rf node_modules
  	exit $installError
  fi
fi

export NODE_PATH="."
export NODE_ENV="mock"

if [[ $1 == "test" ]]; then
    ./node_modules/.bin/mocha --require should --reporter spec --harmony --bail --recursive web/api/locota/search
elif [[ $1 == "debug" ]]; then
	DEBUG=locota,koa-router,koa-send node bin/app.js "$@"
else
    node bin/app.js "$@"
fi