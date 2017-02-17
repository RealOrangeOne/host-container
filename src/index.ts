import { docopt } from 'docopt';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Options } from './types';
import createServer from './server';

const ARG_DATA = readFileSync(join(__dirname, '..', 'src', 'cli.txt')).toString();

function getArgs() : Options {
    const rawArgs = docopt(ARG_DATA, {
        version: require('../package.json').version,
        help: true
    });
    return {
        allowed_ips: rawArgs['--ips'] ? rawArgs['--ips'].split(',') : [],
        basicAuth: rawArgs['--basic-auth'] || '',
        dirList: rawArgs['--list-dir'],
        serveDir: rawArgs['<dir>'],
        opbeat: rawArgs['--opbeat']
    }
}


const app = createServer(getArgs());

const server = app.listen(5000, function () {
    console.log("Server started on port " + server.address().port);
});
