#!/usr/bin/env node

console.log('Starting Server...');

const app = require('express')();
const consts = require('./consts');

const compression = require('compression');
const helmet = require('helmet');
const serveIndex = require('serve-index');
const AccessControl = require('express-ip-access-control');
const opbeat = require('opbeat').start({
  active: consts.IN_PRODUCTION
});

const logging = require('./logging');
const staticFiles = require('./static-files');
const handle404 = require('./404');
const basicAuth = require('./basic-auth');

if (consts.ALLOWED_IPS) {
  app.set('trust proxy', true);

  app.use(AccessControl({
    mode: 'allow',
    allows: consts.ALLOWED_IPS,
    forceConnectionAddress: true,
    statusCode: 404
  }));
}
// Custom Middleware
app.use(logging);
app.use(basicAuth);

if (consts.DIR_LIST) {
  app.use(serveIndex(consts.SERVE_DIR, {
    icons: true
  }));
} else {
  app.use(staticFiles.indexHandle);
}

app.use(staticFiles.static);
app.use(handle404);

// Library
app.use(compression({ level: 9 }));
app.use(helmet());
app.use(opbeat.middleware.express());

const server = app.listen(consts.PORT, function () {
  console.log('Server started on ' + server.address().port);
});

module.exports = server;
