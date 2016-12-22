#!/usr/bin/env node

var program = require('commander');
var locota = require('locota');

// options
program
  .option('-H, --host <host>', 'specify the host [0.0.0.0]', '0.0.0.0')
  .option('-p, --port <port>', 'specify the port [4000]', '4000')
  .option('-b, --backlog <size>', 'specify the backlog size [511]', '511')
  .option('-e, --environment <environment>', 'specify the running environment, supported environments: dev[elopment]|test|stage|prod[uction]')
  .parse(process.argv);

var config;
try {
	config = require('./config.json');
} catch (e) {
	// default configuration
	config = {};
}

if (program.environment) {
	config.environment = program.environment;
}

app = locota(config);

// listen
app.listen(program.port, program.host, ~~program.backlog);
console.log('Listening on %s:%s', program.host, program.port);