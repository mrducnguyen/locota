var request = require('supertest'),
	locota = require('locota'),
	should = require('should');

describe('GET /api/locota/airlines', function() {
	it('should respond with Airlines', function(done) {
		var app = locota();

		request(app.listen())
			.get('/api/locota/airlines')
			.end(function(err, res) {
				should.not.exist(err);
				should(res.body.length).be.above(0);
				done();
			});
	})

	it('should respond with Qantas Airline', function(done) {
		var app = locota();

		request(app.listen())
			.get('/api/locota/airlines')
			.end(function(err, res) {
				should.not.exist(err);
				res.body.should.containEql({
					"code": "QF",
					"name": "Qantas"
				});
				done();
			});
	})
})