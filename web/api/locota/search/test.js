var request = require('supertest'),
	locota = require('locota'),
	should = require('lib/should-custom'),
	util = require('lib/util');

function customParser(res, cb) {
	var results = [],
		delimiter = util.unescape(res.headers['chunk-delimiter']);
	res.data = '';
	res.on('data', function(data) {
		var i;
		res.data += data.toString('utf8');
		if ((i = res.data.indexOf(delimiter)) >= 0) {
			results = results.concat(JSON.parse(res.data.slice(0, i)));
			res.data = res.data.substring(i + 2);
		}
	});
	res.on('end', function() {
		if (res.data.length > 0) {
			var i;
			while ((i = res.data.indexOf('\n\n')) >= 0) {
				results = results.concat(JSON.parse(res.data.slice(0, i)));
				res.data = res.data.substring(i + 2);
			}
		}
		cb(null, Buffer.from(results));
	});
}

describe('GET /api/locota/search?from=MEL&to=SYD&date=2017-01-01', function() {
	it('should respond with Flights from Qantas and Singapore airlines', function(done) {
		this.timeout(10000);
		var app = locota();

		request(app.listen())
			.get('/api/locota/search?from=MEL&to=SYD&date=2017-01-01')
			.buffer(true)
			.parse(customParser)
			.end(function(err, res) {
				should.not.exist(err);
				should(res.body.length).be.above(0);
				res.body.should.containAtLeastOne({
					"airline": {
						"code": "QF",
						"name": "Qantas"
					}
				});
				res.body.should.containAtLeastOne({
					"airline": {
						"code": "SQ",
						"name": "Singapore Airlines"
					}
				});
				done();
			});
	})
})