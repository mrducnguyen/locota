/**
 * Search for flight from an airport to another airport
 * on a particular date
 */
var ContinuousStream = require('lib/continuous-stream'),
	debug = require('debug')('locota'),
	util = require('lib/util'),
	send = require('koa-send'),
	validator = require('validator');

exports.search = function*() {
	this.type = 'json';

	var mock = util.mock(exports.conf, this);
	if (mock) {
		mock();
		return;
	}

	var queryParams = this.query;

	var error = validateQuery(queryParams);
	if (error) {
		this.status = 400;
		this.body = JSON.stringify(error);
	} else {
		this.set('Transfer-Encoding', 'chunked');
		this.set('Chunk-Delimiter', util.escape(exports.conf.delimiter));
		var resultStream = this.body = ContinuousStream();
		//var resultStream = this.body = ContinuousStream();
		yield new Promise((resolve, reject) => {
			util.apiConfig(exports.conf).requestEndpoint('airlines')
				.on('data', function(data) {
					flightSearch(JSON.parse(data.toString('utf8')));
				})
				.on('error', function(err) {
					console.log(err);
					error(err);
				});

			function flightSearch(airlines) {
				console.log("Searching flights");
				var flightPromises = [];
				for (var index in airlines) {
					flightPromises.push(new Promise((resolve, reject) => {
						var params = {
							airlineCode: airlines[index].code,
							from: queryParams.from,
							to: queryParams.to,
							date: queryParams.date
						};
						util.requestEndpoint('flight_search', params)
							.on('data', function(data) {
								debug("Flights for %j received", params);
								resultStream.write(data);
							})
							.on('error', (err) => {
								console.log(err);
							})
							.on('end', () => {
								resultStream.write(exports.conf.delimiter);
								resolve();
							});
					}));
				}
				Promise.all(flightPromises).then(() => {
					resultStream.end();
					resolve();
				});
			};

			function error(err) {
				resultStream.write(JSON.stringify(err));
				resultStream.end();
				reject();
			};
		});
	}
};

function validateQuery(query) {
	var missing = [];
	if (validator.isEmpty(query.from)) {
		missing.push("from")
	}
	if (validator.isEmpty(query.to)) {
		missing.push("to")
	}
	if (validator.isEmpty(query.date)) {
		missing.push("date")
	}

	if (missing.length > 0) {
		return {
			error: ['Query parameter: "' + missing.join(',') + '" are required.']
		};
	}

	var errorMessages = [];
	if (query.from.length < 3) {
		errorMessages.push('"from" airport code [' + query.from + '] is invalid, expected at least 3 characters');
	}
	if (query.to.length < 3) {
		errorMessages.push('"to" airport code [' + query.to + '] is invalid, expected at least 3 characters');
	}
	if (!validator.isDate(query.date)) {
		errorMessages.push('"date" [' + query.date + '] is invalid, expected at least 3 characters');
	}

	if (errorMessages.length > 0) {
		return {
			error: errorMessages
		};
	}
	return false;
};