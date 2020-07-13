const request = require('supertest');
const server = require('../index');

describe('/coordinates (without router)', function() {
  it('GET responds with 200', function(done) {
    request(server)
      .get('/coordinates')
      .expect(200, done);
  });
  it('GET returns lat/lon URL params as JSON object', function(done) {
    request(server)
      .get('/coordinates?lat=4&lon=8')
      .expect(200, {
        lat: "4",
        lon: "8"
      }, done);
  });
});

describe('/book (with router)', function() {
  it('GET responds with 500', function(done) {
    request(server)
      .get('/book')
      .expect(500, done);
  });

  it('POST responds with 201', function(done) {
    request(server)
      .post('/book')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done);
  });

  it('POST returns JSON from request body', function(done) {
    var data = {
      "id": 0815,
      "title": "A tale of soul and sword",
      "cool": true
    };

    request(server)
      .post('/book')
      .set('Content-Type', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(201, data, done);
  });

  it('PUT responds with 200', function(done) {
    request(server)
      .put('/book')
      .expect(200, done);
  });
});
