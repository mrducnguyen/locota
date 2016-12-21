
var request = require('supertest');
var locota = require('../..');

describe('GET /airlines', function(){
  it('should respond with Airlines', function(done){
    var app = locota();

    request(app.listen())
    .get('/airlines')
    .end(function(err, res){
      if (err) return done(err);
      should(res.body.length).be.above(0);
      res.body.should.containEql({ "code": "QF", "name": "Qantas" });
      done();
    });
  })
})
