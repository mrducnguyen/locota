/**
 * Create a transform stream that just pushes all data
 */

var Transform = require('stream').Transform;
var inherits = require('util').inherits;

module.exports = ContinuousStream;

inherits(ContinuousStream, Transform);

function ContinuousStream(options) {
	if (!(this instanceof ContinuousStream)) return new ContinuousStream(options);

	Transform.call(this, options);
}

ContinuousStream.prototype._transform = function(data, enc, cb) {
	this.push(data);
	cb();
};