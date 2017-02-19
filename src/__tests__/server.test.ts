import { expect } from 'chai';
import { runServer } from './helpers';
import * as fs from 'fs';


describe('Server', function () {
    it('should test', function () {
        expect(2 + 2).to.equal(4);
    });

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

    it('Should respond with 404 on bad path', function (done) {
       runServer({
           allowed_ips: [],
           basicAuth: [],
           dirList: false,
           serveDir: 'site/',
           opbeat: false,
           open: false
       }, '/foo/bar', function (response : any) {
           expect(response.ok).to.be.false;
           done();
       });
    });

    describe('index route', function () {
        const body = fs.readFileSync(__dirname + '/../../site/index.html').toString();

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
                    response.text().then(function (text : any) {
                        expect(text).to.equal(body);
                        done();
                    });
                });
            });
        });
    });
});
