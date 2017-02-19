import * as winston from 'winston';
import * as expressWinston from 'express-winston';

export default expressWinston.logger({
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
