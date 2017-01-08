var _ = require('lodash'),
	util = require('./util'),
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
		chunkCount = 0,
		results = {
			loading: true,
			flights: [],
			lastPosition: 0
		};

	registerHelpers();

	search
		.on('beforeSubmit', function(form, params) {
			results.searchParams = $.extend({}, params);
			results.loading = true;
			results.flights = [];
			results.lastPosition = 0;
			setDateRange(results, params);
			clearView();
		})
		.on('response', function(res) {
			if (res.statusCode !== 200) {
				readBody(res, function(res) {
					renderError(res.body);
				});
			} else {
				readBody(res, function(res, last) {
					if (res.body) {
						results.flights = results.flights.concat(res.body);
						renderChunk(results);
					}
					if (last) {
						renderFilter(results);
						attachEvents(search, results);
					}
				});
			}

			res.on('end', function() {
				results.loading = false;
			});
		});

	function readBody(res, cb) {
		res.data = Buffer.from([]);
		res.chunkDelimiter = util.unescapeSpecialCharacters(res.headers['chunk-delimiter']);
		res.on('data', function(data) {
			parseData(data, false);
		});
		res.on('end', function(data) {
			parseData(data, true);
		});

		function parseData(newData, last) {
			if (newData && newData.length > 0) {
				res.data = Buffer.concat([res.data, newData]);
			}
			if (res.data.length > 0 && res.chunkDelimiter) {
				// if there is a delimiter, continuously parsing parts of the data
				// body will be reset each time
				while ((i = res.data.indexOf(res.chunkDelimiter)) >= 0) {
					res.body = JSON.parse(res.data.slice(0, i).toString('utf8').replace(/^\s+|\s+$/g, ''));
					res.data = res.data.slice(i + 2);
					cb(res, false);
				}
			}
			if (last) {
				if (res.data.length > 0) {
					var dataStr = res.data.toString('utf8').replace(/^\s+|\s+$/g, '');
					if (dataStr.length > 0) {
						res.body = JSON.parse(dataStr);
					}
				}

				cb(res, last);
			}
		}
	}
}

function renderError(err) {
	$('#resultView').html(templates['error'](err));
}

function renderChunk(results) {
	if (results.lastPosition === 0) {
		$('#resultView').html(templates['results'](results));
	} else if (results.lastPosition < results.flights.length) {
		var newResults = {
			flights: results.flights.slice(results.lastPosition)
		};
		renderPartialResults(newResults);
	}
	results.lastPosition = results.flights.length;
}

function renderPartialResults(results, emptyFirst) {
	var resultTable = $('#resultTable'),
		tbody = resultTable.find('tbody');
	if (emptyFirst) {
		tbody.empty();
	}
	tbody.append(Handlebars.partials['_resultRow'](results));
}

function renderFilter(results) {
	results.airlines = _.map(_.uniqBy(results.flights, 'airline.code'), 'airline');
	$('#resultFilter').html(Handlebars.partials['_resultFilter'](results));

	//initialy filter the results
	filterResults(results);
}

function filterResults(results) {
	var airlineCode = $('#filterResultAirline').val(),
		sortCode = $('#filterResultSort').val();

	function comparator(a, b) {
		switch (sortCode) {
			case 'price-asc':
				return a.price - b.price;
			case 'price-desc':
				return b.price - a.price;
			case 'time-asc':
				var timeA = moment(a.start.dateTime, 'YYYY-MM-DDTHH:mm:ss+Z'),
					timeB = moment(b.start.dateTime, 'YYYY-MM-DDTHH:mm:ss+Z');
				return timeA.diff(timeB, 'minutes');
			case 'time-desc':
				var timeA = moment(a.start.dateTime, 'YYYY-MM-DDTHH:mm:ss+Z'),
					timeB = moment(b.start.dateTime, 'YYYY-MM-DDTHH:mm:ss+Z');
				return timeB.diff(timeA, 'minutes');
		}
	}
	var filteredFlights;
	if (airlineCode.toLowerCase() === 'all') {
		filteredFlights = results.flights;
	} else {
		filteredFlights = _.filter(results.flights, ['airline.code', airlineCode]);
	}
	filteredFlights.sort(comparator);
	results.filteredFlights = filteredFlights;
	renderPartialResults({
		flights: filteredFlights
	}, true);
}

function clearView() {
	$('#resultView').empty();
}

function setDateRange(results, params) {
	var currentDate = moment(params.date),
		now = moment();
	results.dateRange = [];
	currentDate.date(params.date.getDate() - config.dateRange);
	if (currentDate.isBefore(now)) {
		currentDate = now;
	}
	var i = config.dateRange * 2;
	while (i >= 0) {
		var mom = moment(currentDate);
		results.dateRange.push({
			date: mom,
			dateYYMMDD: mom.format('YYYY-MM-DD'),
			active: currentDate.isSame(params.date, 'day')
		});
		currentDate.date(currentDate.date() + 1);
		i--;
	}
}

function attachEvents(search, results) {
	// filter events
	$('#resultFilter').on('change', 'select', function() {
		filterResults(results);
	});

	// change date
	$('#resultDateRange').on('click', 'a:not(.disabled)', function(e) {
		search.emit('changeDate', moment(this.hash.slice(1), 'YYYY-MM-DD').toDate());
		e.preventDefault();
		return false;
	});

	// pick flight
	$('#resultTable').on('click', 'tbody tr', function() {
		$('#selectedFlights').html(Handlebars.partials['_selectedFlights'](results.filteredFlights[$(this).index()]));
	});
}

function registerHelpers() {
	function isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	Handlebars.registerHelper('formatDateFull', function(value) {
		var mom;
		if (moment.isMoment(value)) {
			mom = value;
		} else if (moment.isDate(value)) {
			mom = moment(value);
		}

		if (mom) {
			return mom.format('dddd, DD MMMM YYYY');
		}

		return value;
	});

	Handlebars.registerHelper('formatDateTimeString', function(value) {
		return moment(value, 'YYYY-MM-DDTHH:mm:ss+Z').format('DD/MM/YYYY, HH:mm Z');
	});

	Handlebars.registerHelper('formatDuration', function(value) {
		if (Number.isInteger(value)) {
			var minute = parseInt(value);
			var plural = minute == 1 ? '' : 's';
			return minute + ' minute' + plural + ' (' + moment.duration(parseInt(value), 'minutes').humanize() + ')';
		}

		return value;
	});

	Handlebars.registerHelper('formatAUD', function(value) {
		if (isNumeric(value)) {
			return '$ ' + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
		}

		return value;
	});

	Handlebars.registerHelper('json', function(obj) {
		return JSON.stringify(obj, null, '\t');
	});
}