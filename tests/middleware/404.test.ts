import { expect } from 'chai';
import { runServer } from '../helpers';
import * as fs from 'fs';
import * as path from 'path';

describe('404 Middleware', function () {
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
           expect(response.status).to.equal(404);
           expect(response.text()).to.eventually.include('Cannot GET').notify(done);
       });
    });

    describe('Custom 404 Page', function () {
        const CUSTOM_PAGE = path.join(__dirname, '..', '..', 'site', '.404.html')
        beforeEach(function () {
            fs.writeFileSync(CUSTOM_PAGE, 'Custom 404 Page');
        });

        afterEach(function () {
            fs.unlinkSync(CUSTOM_PAGE);
        });

        it('should have custom page', function (done) {
            runServer({
                allowed_ips: [],
                basicAuth: [],
                dirList: false,
                serveDir: 'site/',
                opbeat: false,
                open: false
            }, '/foo/bar', function (response : any) {
                expect(response.ok).to.be.false;
                expect(response.status).to.equal(404);
                expect(response.text()).to.eventually.include('Custom 404 Page').notify(done);
            });
        });
    });
});
