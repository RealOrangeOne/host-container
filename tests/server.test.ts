import { expect } from 'chai';
import { runServer } from './helpers';
import * as fs from 'fs';
import * as path from 'path';


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

    it('Should nave no x-powered-by header', function (done) {
       runServer({
           allowed_ips: [],
           basicAuth: [],
           dirList: false,
           serveDir: 'site/',
           opbeat: false,
           open: false
       }, '/index.html', function (response : any) {
              expect(response.status).to.equal(200);
              expect(response.headers.get('x-powered-by')).to.equal(null);
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
});
