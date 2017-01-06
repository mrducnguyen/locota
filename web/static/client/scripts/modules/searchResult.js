var util = require('./util'),
	moment = require('moment'),
	templates = require('../templates');

var config = {
	dateRange: 2 // +- 2 date from selected date
}

module.exports = searchResult;

function searchResult(search) {
	var dataBuffer,
		dataLength = 0,
		delimiter,
		results = {
			loading: true,
			flights: [],
			lastPosition: 0
		};

	registerHelpers();

	search
		.on('beforeSubmit', function(form, params) {
			results.searchParams = $.extend({}, params);
		})
		.on('response', function(res) {
			delimiter = util.unescapeSpecialCharacters(res.headers['chunk-delimiter']);
			res.on('data', chunkReceived);
			res.on('end', function(data) {
				chunkReceived(data, true);
				results.loading = false;
			});
		})
		.on('error', function(err) {
			results.loading = false;
			result.error = err;
			displayError(err);
		});

	// TODO: implement retry
	util.getAirlines({
		callback: function(err, res, data) {
			results.airlines = data;
		}
	});

	function chunkReceived(chunk, ended) {
		if (chunk) {
			var i;
			dataLength += chunk.length;
			if (!dataBuffer) {
				dataBuffer = chunk;
			} else {
				dataBuffer = Buffer.concat([dataBuffer, chunk], dataLength);
			}
			if (delimiter) {
				while ((i = dataBuffer.indexOf(delimiter)) >= 0) {
					results.flights = results.flights.concat(JSON.parse(dataBuffer.slice(0, i).toString('utf8')));
					dataBuffer = dataBuffer.slice(i + 2);
				}
				renderChunk(results);
			} else if (ended) {
				results.flights = JSON.parse(dataBuffer.slice(0, i).toString('utf8'));
				renderChunk(results);
			}
			results.lastPosition = results.flights.length;
		}
	}

	function displayError(err) {

	}

	function setDateRange(results, params) {
		var currentDate = moment(params.date);
		results.dateRange = [];
		currentDate.date(params.date.getDate() - config.dateRange);
		var i = config.dateRange * 2;
		while (i >= 0) {
			results.dateRange.push({
				date: currentDate.format('YYYY-MM-DD'),
				active: currentDate.isSame(params.date)
			});
			currentDate.date(currentDate.date() + 1);
			i--;
		}
		console.log(results.dateRange);
	}

	function registerHelpers() {
		function isNumeric(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}

		Handlebars.registerHelper('formatDateFull', function(value) {
			if (moment.isDate(value)) {
				return moment(value).format('dddd, DD MMMM YYYY');
			} else {
				return value;
			}
		});

		Handlebars.registerHelper('formatDateTimeString', function(value) {
			return moment(value, 'YYYY-MM-DDTHH:mm:ss+Z').format('DD MMM YYYY, HH:mm:ss Z');
		});

		Handlebars.registerHelper('formatDuration', function(value) {
			if (Number.isInteger(value)) {
				var minute = parseInt(value);
				var plural = minute == 1 ? '' : 's';
				return minute + ' minute' + plural + ' (' + moment.duration(parseInt(value), 'minutes').humanize() + ')';
			} else {
				return value;
			}
		});

		Handlebars.registerHelper('formatAUD', function(value) {
			if (isNumeric(value))
				return new Intl.NumberFormat('en-AU', {
					style: 'currency',
					currency: 'AUD'
				}).format(value);
			else
				return value;
		});
	}
}

function renderChunk(results) {
	var resultView = $('#resultView');
	if (results.lastPosition === 0) {
		resultView.html(templates['results'](results));
	}
}