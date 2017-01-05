module.exports = util();

var path2Regexp = require('path-to-regexp'),
	request = require('request'),
	debug = require('debug')('locota');

var _config,
	_endpointConfig,
	_regexCache;

function util() {

	function validateEndpointConfig(endpointConfig) {
		var env = endpointConfig[0];
		if (typeof endpointConfig[1].baseUrl === 'undefined') {
			throw new Error('.baseUrl is required for endpoint configuration for environment: ' + env);
		}

		if (endpointConfig[1].baseUrl.endsWith('/')) {
			endpointConfig[1].baseUrl.slice(0, -1);
		}
	}

	function getEnvEndpointsConfig() {
		if (typeof _config === 'undefined') {
			throw new Error('Config is undefined, pass it in by calling .apiConfig(conf)');
		}

		if (_config.apiEndpoints) {
			var endpointConfig = [];
			if (_config.apiEndpoints[global.__ENVIRONMENT]) {
				endpointConfig.push(global.__ENVIRONMENT);
				endpointConfig.push(_config.apiEndpoints[global.__ENVIRONMENT]);
			} else {
				for (var env in _config.apiEndpoints) {
					console.log('WARNING: apiEndpoints for environment [%s] not found. Using first found endpoint environment [%s]', global.__ENVIRONMENT, env);
					endpointConfig.push(env);
					endpointConfig.push(_config.apiEndpoints[env]);
					break;
				}
			}
			return endpointConfig;
		}
		throw new Error('API Endpoints configuration is missing, please provide .apiEndpoints in _config.json for at least 1 environment');
	}

	function toApiUrl(endpoint, parameters) {
		var env = _endpointConfig[0];
		var endpointPath = _endpointConfig[1][endpoint];
		var cacheKey = env + '_' + endpoint;

		if (!_regexCache[cacheKey]) {
			_regexCache[cacheKey] = path2Regexp.compile(endpointPath);
		}
		var url = _endpointConfig[1].baseUrl + _regexCache[cacheKey](parameters);
		debug('Endpoint [%s] url: %s', endpoint, url);
		return url;
	}

	function apiConfig(conf) {
		if (typeof conf === 'undefined') {
			return _config;
		}
		_config = conf;
		_endpointConfig = getEnvEndpointsConfig();
		_regexCache = {};
		validateEndpointConfig(_endpointConfig);
		return this;
	}

	function listEndpoints() {
		if (typeof _endpointConfig === 'undefined') {
			throw new Error('Endpoint config is undefined, call .apiConfig(conf) first');
		}
		var endpoints = {};
		for (var endpoint in _endpointConfig[1]) {
			if (endpoint !== 'baseUrl') {
				endpoints[endpoint] = _endpointConfig[1][endpoint];
			}
		}
		return endpoints;
	}

	function requestEndpoint(endpoint, parameters, method) {
		if (typeof method === 'undefined') {
			method = 'get';
		}
		if (typeof parameters === 'undefined') {
			parameters = {};
		}
		debug('Initiated "%s" request to endpoint: %s, with parameter: %j', method, endpoint, parameters);
		return request[method.toLowerCase()]({
			url: toApiUrl(endpoint, parameters),
			encoding: _config.encoding || 'utf8'
		});
	}

	/* General helpers */
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

	function mock(conf, ctx) {
		if (global.__ENVIRONMENT === 'mock') {
			var mock = require('lib/mock');
			return mock.resource.bind(ctx, conf, ctx);
		}
		return false;
	}

	return {
		apiConfig: apiConfig,
		requestEndpoint: requestEndpoint,
		listEndpoints: listEndpoints,
		escape: escapeSpecialCharacters,
		unescape: unescapeSpecialCharacters,
		mock: mock
	}
}