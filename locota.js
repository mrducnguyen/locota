/**
 * Module dependencies.
 */

var responseTime = require('koa-response-time'),
	compress = require('koa-compress'),
	logger = require('koa-logger'),
	router = require('koa-router'),
	cors = require('koa-cors'),
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

	// Global error caching
	app.use(function*(next) {
		try {
			yield next;
		} catch (err) {
			this.status = err.status || 500;
			this.body = shouldShowErrorDetails() ? err.message : 'An error has occured, please try again later';
			this.app.emit('error', err, this);
		}
	});
	// logging

	if ('test' != env) app.use(logger());

	// x-response-time
	app.use(responseTime());

	// compression
	app.use(compress());

	// Cross-origin requests
	app.use(cors({
		origin: true,
		maxAge: true,
		methods: 'GET',
		headers: 'Accept,Content-Type,Accept-Encoding',
		expose: 'Transfer-Encoding,Chunk-Delimiter'
	}));

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


function shouldShowErrorDetails() {
	return global.__ENVIRONMENT === 'mock' || global.__ENVIRONMENT === 'development' || global.__ENVIRONMENT === 'test';
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