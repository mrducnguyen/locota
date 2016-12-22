
/**
 * Airports API, it will take in 1 query and return all the airports
 */
var ContinuousStream = require('lib/continuous-stream'),
    util = require('lib/util');

exports.getAirports = function *(){
  this.type = 'json';
  var stream = this.body = ContinuousStream();
  util.apiConfig(exports.conf).requestEndpoint('airports', { query: this.query.q }).pipe(stream);
};