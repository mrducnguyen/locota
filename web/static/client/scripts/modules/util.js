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
		var url = config.api.baseUrl;
		if (parameters) {
			url += _regexCache[endpoint](parameters);
		} else {
			// remove query string
			if (endpointPath.indexOf('?') >= 0) {
				url += endpointPath.slice(0, endpointPath.indexOf('?'));
			} else {
				url += endpointPath;
			}
		}
		return url;
	}

	function consumeApi(name, parameters, options) {
		options = $.extend({
			json: true,
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		}, options);
		var callback;
		if (typeof options.callback === 'function') {
			callback = options.callback;
		}
		delete options.callback;
		return request.get(getApiUrl(name, parameters), options, callback);
	}

	function search(params, options) {
		return consumeApi('search', params, options);
	}

	function getAirlines(options) {
		return consumeApi('airlines', null, options);
	}

	function getAirports(params, options) {
		return consumeApi('airports', params, options);
	}

	function escapeSpecialCharacters(text) {
		// http://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
		if (text) {
			return text
				.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&")
				.replace(/\n/g, "\\n");
		}
		return text;
	}

	function unescapeSpecialCharacters(text) {
		// http://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
		if (text) {
			return text
				.replace(/\\n/g, "\n")
				.replace(/\\/g, "");
		}
		return text;
	}

	return {
		getApiUrl: getApiUrl,
		consumeApi: consumeApi,
		search: search,
		getAirlines: getAirlines,
		getAirports: getAirports,
		escapeSpecialCharacters: escapeSpecialCharacters,
		unescapeSpecialCharacters: unescapeSpecialCharacters
	}
}