var request = require('supertest'),
	locota = require('locota'),
	should = require('lib/should-custom');

describe('GET /api/locota/airports?q=melb', function() {
	it('should respond with Melbourne', function(done) {
		var app = locota();

		request(app.listen())
			.get('/api/locota/airports?q=melb')
			.end(function(err, res) {
				should.not.exist(err);
				should(res.body.length).be.above(0);
				should.config.checkProtoEql = true;
				res.body.should.containAtLeastOne({
					"airportCode": "MEL",
					"airportName": "Tullamarine Arpt"
				});
				done();
			});
	})
})

describe('GET /api/locota/airports?q=syd', function() {
	it('should respond with Sydney', function(done) {
		var app = locota();

		request(app.listen())
			.get('/api/locota/airports?q=syd')
			.end(function(err, res) {
				should.not.exist(err);
				should(res.body.length).be.above(0);
				should.config.checkProtoEql = true;
				res.body.should.containAtLeastOne({
					"airportCode": "SYD",
					"airportName": "Kingsford Smith"
				});
				done();
			});
	})
})