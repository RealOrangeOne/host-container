import { docopt } from 'docopt';
import createServer from './server';
import getArgs from './cli';

console.log("Starting Server...")
const app = createServer(getArgs());

const server = app.listen(5000, function () {
    console.log("Server started on port " + server.address().port);
});
