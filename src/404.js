const staticFile = require('connect-static-file');
const path = require('path');
const { SERVE_DIR } = require('./utils');

const handle404 = staticFile(path.join(SERVE_DIR, '.404.html'));
module.exports = function (request, response, next) {
  response.statusCode = 404;
  return handle404(request, response, next);
};
