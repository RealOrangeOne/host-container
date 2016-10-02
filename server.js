const express = require('express');
const staticFile = require('connect-static-file');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');

const PORT = process.env.PORT || 5000;
const SERVE_DIR = path.join(__dirname, '/site');
const PAGE_404 = path.join(SERVE_DIR, '.404.html');

const directory = /\/$/;

const expressConfig = {
  dotfiles: 'ignore',
  index: false,
  redirect: true
};

const app = express();

app.use(compression({ level: 9 }));
app.use(helmet());


app.use(function (request, response, next) {
  if (directory.exec(request.url)) {
    request.url = path.join(request.url, 'index.html');
  }
  next();
});

app.use(express.static(SERVE_DIR, expressConfig));

app.use(function (request, response, next) {
  response.statusCode = 404;
  staticFile(PAGE_404)(request, response, next);
});


const server = app.listen(PORT, function () {
  console.log('Server started on port ' + server.address().port);
});
