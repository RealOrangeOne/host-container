#!/usr/bin/env node
const express = require('express');
const staticFile = require('connect-static-file');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');
const opbeat = require('opbeat').start({
  active: process.env.NODE_ENV === 'production'
});

const PORT = process.env.PORT || 5000;
let SERVE_DIR;
if (process.env.NODE_ENV === 'test') {
  SERVE_DIR = 'site';
} else {
  SERVE_DIR = process.argv[process.argv.length - 1];
}
const PAGE_404 = path.join(SERVE_DIR, '.404.html');

const app = express();

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      colorize: true
    })
  ],
  meta: false,
  msg: '{{ req.url }} '
    .concat('status:{{ res.statusCode }} ')
    .concat('useragent:{{ req.headers["user-agent"] }} ')
    .concat('time:{{ res.responseTime }}ms'),
  colorize: true,
  statusLevels: true
}));

app.use(function (request, response, next) {
  if (request.url.endsWith('/')) {
    request.url = path.join(request.url, 'index.html');
  }
  next();
});

app.use(express.static(SERVE_DIR, {
  dotfiles: 'ignore',
  index: false,
  redirect: true
}));

app.use(function (request, response, next) {
  response.statusCode = 404;
  staticFile(PAGE_404)(request, response, next);
});


app.use(compression({ level: 9 }));
app.use(helmet());
app.use(opbeat.middleware.express());

const server = app.listen(PORT, function () {
  console.log('Server started on port ' + server.address().port);
});

module.exports = server;
