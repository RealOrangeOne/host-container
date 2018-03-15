import * as express from 'express';

import * as AccessControl from 'express-ip-access-control';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as opbeat from 'opbeat';
import * as referrerPolicy from 'referrer-policy';
import * as morgan from 'morgan';

import basicAuthHandler from './middleware/basic-auth';
import { serveIndexHandle, indexHandle, staticFileHandle } from './middleware/static-files';
import handle404 from './middleware/404';

import { Options } from './types';

export default function createServer(opts : Options) : express.Application {
    const app = express();

    app.use(helmet({
        hsts: {
            maxAge: 5184000,
            setIf: () => !opts.allowHttp,
            includeSubdomains: false
        },
        noCache: true,
        expectCt: {
            enforce: false,
            maxAge: 1000
        }
    }));
    app.use(referrerPolicy({ policy: 'same-origin' }));

    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('combined'));
    }

    if (opts.allowed_ips.length) {
        app.set('trust proxy', true);
        app.use(AccessControl({
            mode: 'allow',
            allows: opts.allowed_ips,
            statusCode: 404
        }));
    }

    if (opts.basicAuth.length) {
        app.use(basicAuthHandler(opts.basicAuth[0], opts.basicAuth[1]));
    }

    if (opts.dirList) {
        app.use(serveIndexHandle(opts.serveDir));
    } else {
        app.use(indexHandle);
    }

    app.use(staticFileHandle(opts.serveDir));
    app.use(handle404(opts.serveDir));

    app.use(compression({ level: 9 }));
    if (opts.opbeat) {
        app.use(opbeat.start({
            active: opts.opbeat
        }).middleware.express());
    }

    return app;
}
