import { docopt } from 'docopt';
import createServer from './server';
import getArgs from './cli';

console.log("Starting Server...");

const ARGS = getArgs();
const app = createServer(ARGS);

const server = app.listen(ARGS.port, function () {
    console.log("Server started on port " + server.address().port);
});
