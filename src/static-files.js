const express = require('express');
const path = require('path');
const { SERVE_DIR } = require('./utils');

module.exports.indexHandle = function (request, response, next) {
  if (request.url.endsWith('/')) {
    request.url = path.join(request.url, 'index.html');
  }
  next();
};

module.exports.static = express.static(SERVE_DIR, {
  dotfiles: 'ignore',
  index: false,
  redirect: true
});
