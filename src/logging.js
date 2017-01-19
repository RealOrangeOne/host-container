const winston = require('winston');
const expressWinston = require('express-winston');

module.exports = expressWinston.logger({
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
});
