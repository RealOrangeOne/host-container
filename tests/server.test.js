const request = require('supertest');
const fs = require('fs');


describe('Server', function () {
  var server;
  before(function () {
    server = require('../src/server');
  });

  after(function () {
    server.close();
  });

  it('responds to /', function (done) {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('returns 404 on bad path', function (done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });

  describe('index route', function () {
    const body = fs.readFileSync(__dirname + '/../site/index.html').toString();

    it('should render /index.html', function (done) {
      request(server)
      .get('/index.html')
      .expect(200, body, done);
    });

    it('should render /', function (done) {
      request(server)
      .get('/')
      .expect(200, body, done);
    });
  });
});
