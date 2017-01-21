const basicAuth = require('express-basic-auth');
const { BASIC_AUTH_ENABLED } = require('./consts');

function basicAuthHandler(username, password) {
  return process.env.BASIC_AUTH_USERNAME === username && process.env.BASIC_AUTH_PASSWORD === password;
}

if (BASIC_AUTH_ENABLED) {
  module.exports = basicAuth({
    authorizer: basicAuthHandler,
    challenge: true
  });
} else {
  module.exports = (req, res, next) => next();
}


