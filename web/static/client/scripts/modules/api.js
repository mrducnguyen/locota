var request = require('request'),
	$ = require('jquery'),
	path2Regexp = require('path-to-regexp');

module.exports = Util();

function Util() {
	var _regexCache = {};
	var config = require('./api-config.json');

	function getApiUrl(endpoint, parameters) {
		var endpointPath = config.api[endpoint];

		if (!_regexCache[endpoint]) {
			_regexCache[endpoint] = path2Regexp.compile(endpointPath);
		}
		var url = config.api.baseUrl + _regexCache[endpoint](parameters);
		console.log(url);
		return url;
	}

	function consumeApi(name, parameters, options) {
		options = $.extend({
			"Accept": "application/json",
			"Content-Type": "application/json"
		}, options);
		return request.get(getApiUrl(name, parameters), options);
	}

	function search(params) {
		return consumeApi('search', params);
	}

	function getAirlines() {
		return consumeApi('airlines', null);
	}

	function getAirports(params) {
		return consumeApi('airports', params);
	}

	function escapeHtml(unsafe) {
		return $('<div />').text(unsafe).html()
	}

	function unescapeHtml(safe) {
		return $('<div />').html(safe).text();
	}

	return {
		consumeApi: consumeApi,
		search: search,
		getAirlines: getAirlines,
		getAirports: getAirports,
		escapeHtml: escapeHtml,
		unescapeHtml: unescapeHtml
	}
}