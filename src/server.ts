import express, { Application } from 'express';

import AccessControl from 'express-ip-access-control';
import compression from 'compression';
import helmet from 'helmet';
import opbeat from 'opbeat';

import logging from './middleware/logging';
import basicAuthHandler from './middleware/basic-auth';
import { serveIndexHandle, indexHandle, staticFileHandle } from './middleware/static-files';
import handle404 from './middleware/404';

import { Options } from './types';

export default function createServer(opts : Options) : Application {
    const app = express();
    const opbeatHandle = opbeat.start({
        active: opts.opbeat
    });

    app.use(logging);

    if (opts.allowed_ips) {
        app.set('trust proxy', true);
        app.use(AccessControl({
            mode: 'allow',
            allows: opts.allowed_ips,
            statusCode: 404
        }));
    }

    if (opts.basicAuth) {
        app.use(basicAuthHandler(opts.basicAuth[0], opts.basicAuth[1]));
    }

    if (opts.dirList) {
        app.use(serveIndexHandle(opts.serveDir));
    } else {
        app.use(indexHandle);
    }

    app.use(staticFileHandle(opts.serveDir));
    app.use(handle404);

    app.use(compression({ level: 9 }));
    app.use(helmet());
    app.use(opbeatHandle.middleware.express());

    return app;
}
