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

	setDateUtils(results);
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

	function setDateUtils(results) {
		$.extend(results, {
			formatDateFull: function() {
				console.log('formatDateFull');
				console.log(this);
				return function(text, render) {
					console.log(arguments);
					console.log(text);
					return text;
					var val = render(text);
					return moment(val).format('dddd, DD MMMM YYYY');
				};
			},
			formatDateTime: function() {
				return function(text, render) {
					console.log(arguments);
					console.log(text);
					var val = render(text);
					return moment(val).format('DD MMM YYYY, HH:mm:ss Z');
				};
			},
			formatDuration: function() {
				return function(text, render) {
					console.log(arguments);
					console.log(text);
					var val = render(text);
					return moment().duration(val, 'minutes').humanize();
				}
			},
			formatMoney: function() {
				return function(text, render) {
					console.log(arguments);
					console.log(text);
					var val = render(text);
					return new Intl.NumberFormat('en-AU').format(val);
				}
			},
		});

	}
}

function renderChunk(results) {
	var resultView = $('#resultView');
	if (results.lastPosition === 0) {
		resultView.html(templates['results'](results));
	}
}