const express = require('express');
const staticFile = require('connect-static-file');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');

const PORT = process.env.PORT || 5000;
const SERVE_DIR = path.join(__dirname, '/site');
const PAGE_404 = path.join(SERVE_DIR, '.404.html');
const EXPRESS_CONFIG = {
  dotfiles: 'ignore',
  index: false,
  redirect: true
};
const LOGGER_MESSAGE = '{{ req.url }}'
  .concat('status:{{ res.statusCode }} ')
  .concat('useragent:{{ req.headers["user-agent"] }} ')
  .concat('time:{{ res.responseTime }}ms');

const app = express();

app.use(compression({ level: 9 }));
app.use(helmet());
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      colorize: true
    })
  ],
  meta: false,
  msg: LOGGER_MESSAGE,
  colorize: true,
  statusLevels: true
}));

app.use(function (request, response, next) {
  if (request.url.endsWith('/')) {
    request.url = path.join(request.url, 'index.html');
  }
  next();
});

app.use(express.static(SERVE_DIR, EXPRESS_CONFIG));

app.use(function (request, response, next) {
  response.statusCode = 404;
  staticFile(PAGE_404)(request, response, next);
});


const server = app.listen(PORT, function () {
  console.log('Server started on port ' + server.address().port);
});
