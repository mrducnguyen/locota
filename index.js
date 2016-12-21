
/**
 * Module dependencies.
 */

var responseTime = require('koa-response-time');
var compress = require('koa-compress');
var logger = require('koa-logger');
var router = require('koa-router');
var koa = require('koa');
var load = require('./lib/load');
var extend = require('extend');

/**
 * Environment.
 */

var env = process.env.NODE_ENV || 'development';

/**
 * Expose `api()`.
 */

module.exports = api;

/**
 * Initialize an app with the given `opts`.
 *
 * @param {Object} opts
 * @return {Application}
 * @api public
 */

function api(opts) {
  if (!isValidEnvironment(env)) {
    console.log("Environment variable NODE_ENV [%s] is invalid, roll back to 'development'", env);
    env = 'development';
  }
  opts = extend({
    apiPath : '/api',
    environment: env
  }, opts);

  validate(opts);

  var app = koa();
  app.opts = opts;
  app.env = opts.environment;

  // logging

  if ('test' != env) app.use(logger());

  // x-response-time

  app.use(responseTime());

  // compression

  app.use(compress());

  // routing

  app.use(router(app));

  // boot

  load(app, __dirname + opts.apiPath);

  return app;
}


function validate(opts) {
  // path should start with /
  if (!opts.apiPath.startsWith('/')) {
    opts.apiPath = '/' + opts.apiPath;
  }
  if (opts.staticResoucePath && !opts.staticResoucePath.startsWith('/')) {
    opts.staticResoucePath = '/' + opts.staticResoucePath;
  }

  // environment validation
  if (opts.environment) {
    opts.environment = opts.environment.toLowerCase();
    switch (opts.environment) {
      case 'dev':
        opts.environment = 'development';
        break;
      case 'prod':
        opts.environment = 'production';
        break;
    }
    if (!isValidEnvironment(opts.environment)) {
      throw new Error('Unsupported environment: ' + opts.environment);
    }
  }
}

function isValidEnvironment(env) {
  if (env) {
    env = env.toLowerCase();
    switch (env) {
      case 'development':
      case 'test':
      case 'stage':
      case 'production':
        return true;
    }
  }
  return false;
}