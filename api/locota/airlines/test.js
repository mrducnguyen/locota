
var request = require('supertest'),
    locota = require('locota'),
    should = require('should');

describe('GET /locota/airlines', function(){
  it('should respond with Airlines', function(done){
    var app = locota();

    request(app.listen())
    .get('/locota/airlines')
    .end(function(err, res){
      should.not.exist(err);
      should(res.body.length).be.above(0);
      res.body.should.containEql({ "code": "QF", "name": "Qantas" });
      done();
    });
  })
})
