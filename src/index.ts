import { docopt } from 'docopt';
import createServer from './server';
import getArgs from './cli';
import * as open from 'open';

console.log("Starting Server...");

const ARGS = getArgs();
const app = createServer(ARGS);

const server = app.listen(ARGS.port, function () {
    const port = server.address().port;
    console.log("Server started on port " + port);
    if (ARGS.open) {
        open('http://0.0.0.0:' + port);
    }
});

