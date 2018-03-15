#!/usr/bin/env node
import { docopt } from 'docopt';
import createServer from './server';
import getArgs from './cli';
import open from 'open';

const ARGS = getArgs();

console.log("Starting Server...");
const app = createServer(ARGS);

export const server = app.listen(ARGS.port, function () {
    const port = server.address().port;
    console.log("Server started on port " + port);
    if (ARGS.open) {
        open('http://0.0.0.0:' + port);
    }
});
