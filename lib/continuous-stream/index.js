/**
 * Create a transform stream that converts a stream
 * to JSON string, ended with '\n\n'
 */

var Transform = require('stream').Transform;
var inherits = require('util').inherits;

module.exports = ContinuousStream;

inherits(ContinuousStream, Transform);

function ContinuousStream(options) {
  if (!(this instanceof ContinuousStream)) return new ContinuousStream(options);

  options = options || {};
  Transform.call(this, options);
}

ContinuousStream.prototype._transform = function(data, enc, cb) {
  this.push(data.toString('utf8') + '\n\n');
  cb();
};