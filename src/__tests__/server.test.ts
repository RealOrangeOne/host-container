import { expect } from 'chai';
import { runServer } from './helpers';


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
});
