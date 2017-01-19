#!/usr/bin/env node

console.log('Starting Server...');

const app = require('express')();
const utils = require('./utils');

const compression = require('compression');
const helmet = require('helmet');
const opbeat = require('opbeat').start({
  active: utils.IN_PRODUCTION
});

const logging = require('./logging');
const staticFiles = require('./static-files');
const handle404 = require('./404');

// Custom Middleware
app.use(logging);
app.use(staticFiles.indexHandle);
app.use(staticFiles.static);
app.use(handle404);

// Library
app.use(compression({ level: 9 }));
app.use(helmet());
app.use(opbeat.middleware.express());

const server = app.listen(utils.PORT, function () {
  console.log('Server started on ' + server.address().port);
});

module.exports = server;
