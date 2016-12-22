
var request = require('supertest'),
    locota = require('locota'),
    should = require('should');

describe('GET /locota/search?from=MEL&to=SYD&date=2017-01-01', function(){
  it('should respond with Flights from Qantas and Singapore airlines', function(done){
    var app = locota();

    request(app.listen())
    .get('/locota/search?from=MEL&to=SYD&date=2017-01-01')
    .end(function(err, res){
      should.not.exist(err);
      should(res.body.length).be.above(0);
      res.body.should.containEql({ "airline": { "code": "QF", "name": "Qantas" } });
      res.body.should.containEql({ "airline": { "code": "SQ", "name": "Singapore Airlines" } });
      done();
    });
  })
})
