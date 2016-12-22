#!/bin/bash

if [ ! -d "node_modules" ]; then
  npm install
fi

export NODE_PATH="."
export NODE_ENV="stage"

if [[ $1 == test ]]; then
    ./node_modules/.bin/mocha --require should --reporter spec --harmony --bail api/**/test.js
else
    node bin/app.js
fi