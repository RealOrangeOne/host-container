import { expect } from 'chai';
import { runServer } from '../helpers';


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
});
