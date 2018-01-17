import { expect } from 'chai';
import { runServer } from './helpers';
import * as fs from 'fs';
import * as path from 'path';
import { Options } from '../src/types';

const PKG = require('../package.json');

describe('Server', function () {
    it('Should be usable', function (done) {
       runServer({
           allowed_ips: [],
           basicAuth: [],
           dirList: false,
           serveDir: 'site/',
           opbeat: false,
           open: false
       }, '/index.html', function (response : any) {
              expect(response.status).to.equal(200);
              expect(response.url).to.include('/index.html');
              done();
       });
    });

    describe('index route', function () {
        const body = fs.readFileSync(path.join(__dirname, '..', 'site', 'index.html')).toString();

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

    describe('secure headers', function () {
      const SERVER_SETTINGS = {
        allowed_ips: [],
        basicAuth: [],
        dirList: false,
        serveDir: 'site/',
        opbeat: false,
        open: false,
        allowHttp: false
      } as Options;

      it('Should have no powered by header', function (done) {
        runServer(SERVER_SETTINGS, '/index.html', function (response : any) {
          expect(response.status).to.equal(200);
          expect(response.headers.get('x-powered-by')).to.be.null;
          done();
        });
      });

      it('Should have xss block header', function (done) {
        runServer(SERVER_SETTINGS, '/index.html', function (response : any) {
          expect(response.status).to.equal(200);
          expect(response.headers.get('x-xss-protection')).to.equal('1; mode=block');
          done();
        });
      });

      it('Should block iframes', function (done) {
        runServer(SERVER_SETTINGS, '/index.html', function (response : any) {
          expect(response.status).to.equal(200);
          expect(response.headers.get('x-frame-options')).to.equal('SAMEORIGIN');
          done();
        });
      });

      it('Should have expect-ct header', function (done) {
        runServer(SERVER_SETTINGS, '/index.html', function (response : any) {
          expect(response.status).to.equal(200);
          expect(response.headers.get('expect-ct')).to.equal('max-age=1000');
          done();
        });
      });

      it('Should block DNS prefetch', function (done) {
        runServer(SERVER_SETTINGS, '/index.html', function (response : any) {
          expect(response.status).to.equal(200);
          expect(response.headers.get('x-dns-prefetch-control')).to.equal('off');
          done();
        });
      });

      it('Should block open on IE', function (done) {
        runServer(SERVER_SETTINGS, '/index.html', function (response : any) {
          expect(response.status).to.equal(200);
          expect(response.headers.get('x-download-options')).to.equal('noopen');
          done();
        });
      });

      it('Should block cache', function (done) {
        runServer(SERVER_SETTINGS, '/index.html', function (response : any) {
          expect(response.status).to.equal(200);
          expect(response.headers.get('cache-control')).to.contain('no-store');
          expect(response.headers.get('cache-control')).to.contain('no-cache');
          expect(response.headers.get('pragma')).to.contain('no-cache');
          expect(response.headers.get('surrogate-control')).to.contain('no-store');
          expect(response.headers.get('expires')).to.contain(0);
          done();
        });
      });

      it('Should block referrer transfer', function (done) {
        runServer(SERVER_SETTINGS, '/index.html', function (response : any) {
          expect(response.status).to.equal(200);
          expect(response.headers.get('referrer-policy')).to.contain('same-origin');
          done();
        });
      });

      it('Should have HSTS header', function (done) {
        runServer(SERVER_SETTINGS, '/index.html', function (response : any) {
          expect(response.status).to.equal(200);
          expect(response.headers.get('strict-transport-security')).to.contain('5184000');
          done();
        });
      });
    });
});
