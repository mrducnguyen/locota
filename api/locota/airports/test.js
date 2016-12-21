
var request = require('supertest');
var locota = require('../..');

describe('GET /locota/airports?q=melb', function(){
  it('should respond with Melbourne', function(done){
    var app = api();

    request(app.listen())
    .get('/locota/airports?q=melb')
    .end(function(err, res){
      should.not.exist(err);
      should(res.body.length).be.above(0);
      res.body.should.containDeep({ "airportCode": "MEL", "airportName": "Tullamarine Arpt" });
      done();
    });
  })
})

describe('GET /locota/airports?q=syd', function(){
  it('should respond with Sydney', function(done){
    var app = api();

    request(app.listen())
    .get('/locota/airports?q=syd')
    .end(function(err, res){
      should.not.exist(err);
      should(res.body.length).be.above(0);
      res.body.should.containDeep({ "airportCode": "SYD", "airportName": "Kingsford Smith" });
      done();
    });
  })
})