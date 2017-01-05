/**
 * Create a transform stream that just pushes all data
 */

var Transform = require('stream').Transform;

module.exports = class ContinuousStream extends Transform {
	constructor(options) {
		super(options);
	}

	_transform(data, enc, cb) {
		this.push(data);
		cb();
	}
}