var EventEmitter = require('events').EventEmitter,
	util = require('./util'),
	moment = require('moment'),
	templates = require('../templates'),
	searchResult = require('./searchResult');

module.exports = searchModule();

var config = {
	delayBeforeSearch: 500
};

function searchModule() {
	var emitter = new EventEmitter();
	var searchRequest;

	searchResult(emitter);

	$(function() {
		var searchView = $('#searchView');

		searchView
			.html(templates['search']())
			.find('.date')
			.datepicker({
				autoclose: true,
				todayBtn: true,
				todayHighlight: true
			})
			.datepicker('setDate', new Date());

		var airportFields = searchView.find('.airport-field');
		airportFields.select2({
			ajax: {
				url: util.getApiUrl('airports'),
				dataType: 'json',
				delay: config.delayBeforeSearch,
				data: function(params) {
					return {
						q: params.term
					};
				},
				processResults: function(data, params) {
					return {
						results: preprocessAirport(data, airportFields)
					}
				},
				cache: true
			},
			theme: "bootstrap",
			escapeMarkup: function(markup) {
				return markup;
			},
			minimumInputLength: 2,
			placeholder: "Select an airport",
			templateResult: formatAirport,
			templateSelection: formatAirportName
		});

		var searchForm = searchView.find('.search-form');
		searchForm
			.submit(function(e) {
				var form = $(this);
				var params = {
						date: form.find('.date').datepicker('getDate'),
						from: form.find('[name=from]').select2('data')[0],
						to: form.find('[name=to]').select2('data')[0],
					},
					queryParams = {
						date: moment(params.date).format('YYYY-MM-DD'),
						from: params.from.airportCode,
						to: params.to.airportCode
					};

				// convert array to object
				searchView.children('.loading').remove();
				if (searchRequest) {
					searchRequest.abort();
				}

				emitter.emit('beforeSubmit', this, params);

				searchRequest = util
					.search(queryParams)
					.on('response', function(res) {
						emitter.emit('response', res);
					})
					.on('data', function(data) {
						emitter.emit('data', data);
					})
					.on('error', function(err) {
						emitter.emit('error', err);
					})
					.on('end', function(data) {
						emitter.emit('end', data);
						searchRequest = false;
						searchView.children('.loading').remove()
					});

				searchView.append(templates['loading']({
					message: "Searching for flights. Please wait..."
				}));

				e.preventDefault();
				return false;
			});

		// change date emited back from searchResults
		// TODO: extended EventEmitter instead of returning it and expose a function for doing this
		emitter.on('changeDate', function(date) {
			searchForm.find('.date').datepicker('update', date);
			process.nextTick(function() {
				searchForm.submit();
			});
		});
	});

	return emitter;
}

function preprocessAirport(data, airportFields) {
	var selectedAirports = [];
	airportFields.each(function() {
		selectedAirports.push($(this).val());
	});
	// because select2 required an "id" field
	// and flag require lowercase country code
	for (var idx in data) {
		data[idx].id = data[idx].airportCode;
		data[idx].flag = data[idx].countryCode.toLowerCase();
		if (selectedAirports.indexOf(data[idx].airportCode) >= 0) {
			data[idx].disabled = true;
		}
	}
	return data;
}

function formatAirport(airport) {
	if (airport.loading) return templates['loading']({
		message: "Searching for airports. Please wait..."
	});

	return templates['airport'](airport);
}

function formatAirportName(airport) {
	if (airport.airportName) {
		return airport.airportName + ' (' + airport.airportCode + ')';
	} else {
		return "Please select an airport";
	}
}