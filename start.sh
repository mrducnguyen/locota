#!/bin/bash

if [ ! -d "node_modules" ]; then
  echo "Installing dependencies. Please wait..."

  npm install --production

  cd ./web/static/client
  if [ ! -d "node_modules" ]; then
	  npm install
	fi

  grunt build

  cd ../../..

  INSTALLERROR=$?
  if [ $INSTALLERROR != 0 ]; then
  	echo "Installation returned with error code: $INSTALLERROR"
  	echo "Please ensure node and npm are in PATH, and npm is not blocked from accessing network"
  	rm -Rf node_modules
  	exit $INSTALLERROR
  fi
fi

export NODE_PATH="."
export NODE_ENV="stage"

if [[ $1 == "test" ]]; then
	if [[ ! -e "./node_modules/.bin/mocha" ]]; then
		npm install
	fi
  ./node_modules/.bin/mocha --require should --reporter spec --harmony --bail --recursive web/api/
else
	if [[ -e "locota.pid" ]]; then
		kill -9 `cat ./locota.pid`
	fi

  DEBUG=locota,koa-router,koa-send node bin/app.js "$@" 2>logs/debug.log 1>logs/runtime.log &
  PID=$!
  echo $PID > "locota.pid"

  echo "Server started (PID: $PID). Check logs folder. Use stop.sh to stop server"

  ./node_modules/.bin/opn http://localhost:3000/static/client/build/index.html
fi