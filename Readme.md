
# Locota

  **Lo**comote **co**de **ta**sk basing off [Koa API Boilerplate](https://github.com/koajs/api-boilerplate)

## Installation
  
  1. Clone or download the repo
  1. Navigate to the repo folder
  1. Allow executation of the shell scripts `chmod 755 start.sh stop.sh`
  1. Run `./start.sh`

### Notice
  * Start script will start the server and return. Use `./stop.sh` to stop the server
  * Start script will invoke `npm install` if neccessary, please make sure [NodeJS 6+](https://nodejs.org/en/) is installed

## Usage

```

  Usage: ./start.sh [options]

  Operation:

    test                  start mocha test

  Underlying Node script which will be run: ./bin/app.js  All options will be passed through to it
    -h, --help            output usage information
    -H, --host <host>     specify the host [0.0.0.0]
    -p, --port <port>     specify the port [3000]
    -b, --backlog <size>  specify the backlog size [511]

```

## Structure

  ### Server

  Resources and associated tests are defined in ./web/api by default

~~~~

  locota
    |-- bin
    |-- lib
         |-- continuous-stream : just an extension of Transform stream
         |-- load : koa-api-boilerplate module loader, with customisation to support recursive API loading
         |-- mock : mock util used to mock data services by responding with pre-saved data in `response-export.json` file
         |-- should-custom : extension of `should.js` to provide addtional custom assertions
         |-- util : general helpers, including API calls to http://node.locomote.com/code-task
    |     
    |-- web
         |-- api : API modules (see details below)
         |-- static : static files

~~~~

  Inspired by koa-boilerplate, each API will sit in its own folder, with its own `config.json`, which will inherit its parent `config.json`, following folder structure

~~~~

  locota/web/api
    |-- locota
          |-- config.json : default configuration, shared accross all child folders
          |-- airlines : airlines API
                |-- config.json : its own (minimal) configuration
                |-- index.js : the main API script
                |-- test.js : the API tests
                |-- response-export.json :  the mock JSON data for running in "mock" environment
          |-- airports : airports API
                |-- (similar to airlines)
          |-- search : search API
                |-- (similar to airlines)
~~~~

  #### Internet connection and Proxy

  API middlewares will need to access http://node.locomote.com/code-task. [Request](https://www.npmjs.com/package/request) module is being used to make request.

  If network proxy is present, set it in the HTTP_PROXY and HTTPS_PROXY Environment Variables. Open `start.sh` and change the proxy if needed.
  
  For example:
~~~~
  export HTTP_PROXY=http://username:password@proxy.internal.com.au:8080
  export HTTPS_PROXY=http://username:password@proxy.internal.com.au:8080
~~~~

  ### Client
  
  Sample client is in ./web/static/client. `grunt` is used for task automation. `browsersync` is really helpful, but not required.

  Available grunt tasks:
  - `init` : init the client app,
      - Make sure required vendor libraries are copied to HTML folder
      - Compile `sass` to css
      - Compile `handlebars` templates
      - Browserify scripts
  - `build` : init, then minify then `uglify` the generated script
  - `dist` : build, then package a `release.zip`
  - `default` : start `browsersync` with `watch` task for development


## Tests

  Run `./start.sh test`

## Configuration

Locota `./bin/app.js` provides some default configurations. Host, Port and Backlog can be overrided through command line arguments

~~~~

  {
    host: '0.0.0.0',
    port: '3000',
    backlog: 511,
    webRoot: '/web',                // the resource root path
    apiPath: '/api',                // the folder to scan for APIs
    staticResourcePath: '/static'   // the folder to serve static content
  }

~~~~

# License

  MIT