/**
 * Module dependencies.
 */

var responseTime = require('koa-response-time'),
	compress = require('koa-compress'),
	logger = require('koa-logger'),
	router = require('koa-router'),
	send = require('koa-send'),
	koa = require('koa'),
	load = require('./lib/load'),
	extend = require('extend'),
	querySafe = require('koa-qs');


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
		webRoot: '/web',
		apiPath: '/api',
		includeBase: true
	}, opts);

	validate(opts);

	var app = koa();
	app.opts = opts;
	app.env = global.__ENVIRONMENT = env;

	// logging

	if ('test' != env) app.use(logger());

	// x-response-time
	app.use(responseTime());

	// compression
	app.use(compress());

	// boot
	app = querySafe(app);

	// routing
	app.use(router(app));

	if (opts.staticResourcePath) {
		app.get(opts.staticResourcePath + '/*', function*() {
			console.log(this.path);
			yield send(this, this.path, {
				root: __dirname + opts.webRoot
			});
		});
	}

	load(app, __dirname + opts.webRoot + opts.apiPath);

	return app;
}


function validate(opts) {
	// path should start with /
	if (!opts.apiPath.startsWith('/')) {
		opts.apiPath = '/' + opts.apiPath;
	}
	if (opts.staticResourcePath && !opts.staticResourcePath.startsWith('/')) {
		opts.staticResourcePath = '/' + opts.staticResourcePath;
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
			case 'mock':
			case 'development':
			case 'test':
			case 'stage':
			case 'production':
				return true;
		}
	}
	return false;
}