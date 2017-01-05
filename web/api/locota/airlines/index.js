/**
 * Airline resource
 * support GET only (list all)
 *
 */
var ContinuousStream = require('lib/continuous-stream'),
	util = require('lib/util');

exports.getAirlines = function*() {
	this.type = 'json';
	var mock = util.mock(exports.conf, this);
	if (mock) {
		mock();
		return;
	}

	var stream = this.body = new ContinuousStream();
	util.apiConfig(exports.conf).requestEndpoint('airlines').pipe(stream);
};