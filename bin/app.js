#!/usr/bin/env node

var program = require('commander'),
	locota = require('locota'),
	extend = require('extend');

// options
program
	.option('-H, --host <host>', 'specify the host')
	.option('-p, --port <port>', 'specify the port')
	.option('-b, --backlog <size>', 'specify the backlog size')
	.parse(process.argv);

var config;
try {
	config = require('./config.json');
} catch (e) {
	// default configuration
	config = {};
}

config = validateConfig(config);

app = locota(config);

// listen
app.listen(config.port, config.host, ~~config.backlog);
console.log('Listening on %s:%s', config.host, config.port);

function validateConfig(config) {
	// Program arguments > Config file > Defaults
	config = extend({
		host: '0.0.0.0',
		port: '3000',
		backlog: 511,
		webRoot: '/web',
		apiPath: '/api',
		staticResourcePath: '/static'
	}, config, {
		host: program.host,
		port: program.port,
		backlog: program.backlog
	});

	return config;
}