# tstatic [![CircleCI](https://circleci.com/gh/RealOrangeOne/tstatic/tree/master.svg?style=svg)](https://circleci.com/gh/RealOrangeOne/tstatic/tree/master)
The only static-file server you'll ever need!

### Features:
- Logging
- Basic-Auth _(optional)_
- Custom 404 page
- Optimum Compression - [`compression`](https://www.npmjs.com/package/compression)
- Security checks / headers - [`helmet`](https://www.npmjs.com/package/helmet)
- Opbeat error-reporting - [docs](https://opbeat.com/docs/articles/get-started-with-express/)

### Usage / Configuration
```bash
tstatic <directory>
```
`directory` is where your static files are.

404 errors will return with `<directory>/.404.html`, with status code 404. If this file doesnt exist, plain error page will be shown.


#### Environment
Make sure to set `NODE_ENV` to `production`!

`PORT`: The port you want the server to listen on. Default: `5000`.

`BASIC_AUTH_USERNAME` / `BASIC_AUTH_PASSWORD`: Credentials for built-in basic auth

Opbeat middleware is configured using documented variables [here](https://opbeat.com/docs/articles/opbeat-for-nodejs-api/#appid). _Requires production `NODE_ENV`!_


