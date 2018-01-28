import { expect } from 'chai';
import { runServer } from '../helpers';
import * as fs from 'fs';
import * as path from 'path';
import { Options } from '../../src/types';


describe('Static Files', function () {
  const body = fs.readFileSync(path.join(__dirname, '../..', 'site', 'index.html')).toString();
  const cssBody = fs.readFileSync(path.join(__dirname, '../..', 'site', 'style.css')).toString();

  describe('index route', function () {

    ['', '/', '/index.html'].forEach(function (path : string) {
      it('should render ' + path, function (done) {
        runServer({
          allowed_ips: [],
          basicAuth: [],
          dirList: false,
          serveDir: 'site/',
          opbeat: false,
          open: false
        }, path, function (response : any) {
          expect(response.status).to.equal(200);
          expect(response.text()).to.eventually.equal(body).notify(done);
        });
      });
    });
  });

  it('Should return static files', function (done) {
    runServer({
      allowed_ips: [],
      basicAuth: [],
      dirList: false,
      serveDir: 'site/',
      opbeat: false,
      open: false
    }, '/style.css', function (response : any) {
      expect(response.status).to.equal(200);
      expect(response.text()).to.eventually.equal(cssBody).notify(done);
    });
  });

  describe('Directory listing', function () {
    const SERVER_CONFIG = {
      allowed_ips: [],
      basicAuth: [],
      dirList: true,
      serveDir: 'site/',
      opbeat: false,
      open: false
    } as Options;

    it('Should allow directory listing', function (done) {
      runServer(SERVER_CONFIG, '/', function (response : any) {
        expect(response.status).to.equal(200);
        expect(response.text()).to.eventually.not.equal(body).notify(done);
      });
    });

    it('Should show index file in directory listing', function (done) {
      runServer(SERVER_CONFIG, '/', function (response : any) {
        expect(response.status).to.equal(200);
        expect(response.text()).to.eventually.contain('style.css').notify(done);
      });
    });
    it('Should show css file in directory listing', function (done) {
      runServer(SERVER_CONFIG, '/', function (response : any) {
        expect(response.status).to.equal(200);
        expect(response.text()).to.eventually.contain('index.html').notify(done);
      });
    });

  });

});
