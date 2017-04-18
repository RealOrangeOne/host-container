import * as expressWinston from 'express-winston';
import * as winston from 'winston';

export default expressWinston.logger({
    colorize: true,
    meta: false,
    msg: '{{ req.url }} '
        .concat('status:{{ res.statusCode }} ')
        .concat('useragent:{{ req.headers["user-agent"] }} ')
        .concat('time:{{ res.responseTime }}ms'),
    statusLevels: true,
    transports: [
        new winston.transports.Console({
            colorize: true
        })
    ],
});
