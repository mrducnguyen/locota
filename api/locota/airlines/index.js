
/**
 * Airline resource
 * support GET only (list all)
 *
 */
var ContinuousStream = require('lib/continuous-stream'),
    util = require('lib/util');

exports.getAirlines = function *(){
  this.type = 'json';
  var stream = this.body = ContinuousStream();
  util.apiConfig(exports.conf).requestEndpoint('airlines').pipe(stream);
};