import createServer from '../server';
import { Options } from '../types';
import fetch from 'node-fetch';



export function runServer(opts: Object, url : string, callback: Function) {
    return createServer(opts as Options).listen(1234, function () {
        return fetch('http://0.0.0.0:1234' + url).then(callback);
    });
}
