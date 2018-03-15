import createServer from '../src/server';
import { IOptions } from '../src/types';
import fetch from 'node-fetch';


export function runServer(opts: Object, url : string, callback: Function) {
    const app = createServer(opts as IOptions);
    const server = app.listen(1234, function () {
        return fetch('http://0.0.0.0:1234' + url).then(function (response : any) {
            server.close();
            callback(response);
        });
    });
}
