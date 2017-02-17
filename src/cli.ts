import { docopt } from 'docopt';
import { Options } from './types';

const PKG = require('../package.json');

const ARG_DATA = `
${PKG.name}.
${PKG.description}

Usage:
  tstatic <dir> [options]
  tstatic -h | --help
  tstatic --version

Options:
  -h --help     Show this screen.
  --version     Show version.
  -p <port> --port=<port>  Port to listen on.
  -b <auth> --basic-auth=<auth>   Enable basic-auth.
  -i <ips> --ips=<ips>  Allowed IP addresses.
  -l --list-dir  List Directory.
  -o --opbeat  Enable Opbeat.
`;

export default function getArgs() : Options {
    const rawArgs = docopt(ARG_DATA, {
        version: PKG.version,
        help: true
    });
    return {
        port: rawArgs['--port'] || process.env.PORT || 5000,
        allowed_ips: rawArgs['--ips'] ? rawArgs['--ips'].split(',') : [],
        basicAuth: rawArgs['--basic-auth'] ? rawArgs['--basic-auth'].split(':') : [],
        dirList: rawArgs['--list-dir'],
        serveDir: rawArgs['<dir>'],
        opbeat: rawArgs['--opbeat']
    };
}
