/**
 * Airports API, it will take in 1 query and return all the airports
 */
var ContinuousStream = require('lib/continuous-stream'),
	util = require('lib/util'),
	validator = require('validator');

exports.getAirports = function*() {
	this.type = 'json';

	var mock = util.mock(exports.conf, this);
	if (mock) {
		mock();
		return;
	}

	var stream = this.body = new ContinuousStream();
	var error = validateQuery(this.query);
	if (error) {
		this.status = 400;
		this.body = JSON.stringify(error);
	} else {
		util.apiConfig(exports.conf).requestEndpoint('airports', {
			query: this.query.q
		}).pipe(stream);
	}
};

function validateQuery(query) {
	if (validator.isEmpty(query.q)) {
		return {
			error: ['Query parameter "q" is required.']
		};
	}
	return false;
}