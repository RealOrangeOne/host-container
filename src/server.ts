import express from 'express';

import AccessControl from 'express-ip-access-control';

import { Options } from './types';

export default function createServer(opts : Options) {
    const app = express();

    if (opts.allowed_ips) {
        app.set('trust proxy', true);
        app.use(AccessControl({
            mode: 'allow',
            allows: opts.allowed_ips,
            statusCode: 404
        }));
    }
    
    return app;
}
