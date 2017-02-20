# tstatic

[![CircleCI](https://img.shields.io/circleci/project/github/RealOrangeOne/tstatic.svg?style=flat-square)](https://circleci.com/gh/RealOrangeOne/tstatic/)
[![npm](https://img.shields.io/npm/dm/tstatic.svg?style=flat-square)](https://www.npmjs.com/package/tstatic)
[![npm](https://img.shields.io/npm/v/tstatic.svg?style=flat-square)](https://www.npmjs.com/package/tstatic)

The only static-file server you'll ever need!

### Features:
- Logging - [`winston`](https://www.npmjs.com/package/winston)
- Basic-Auth - [`basic-auth`](https://www.npmjs.com/package/basic-auth)
- Custom 404 page
- Optimum Compression - [`compression`](https://www.npmjs.com/package/compression)
- Security checks / headers - [`helmet`](https://www.npmjs.com/package/helmet)
- Opbeat error-reporting - [docs](https://opbeat.com/docs/articles/get-started-with-express/)
- Whitelist IP Addresses - [`express-ip-access-control`](https://www.npmjs.com/package/express-ip-access-control)
- Directory Listing - [`serve-index`](https://www.npmjs.com/package/serve-index)

### Usage
```bash
  tstatic <dir> [options]

  -h --help     Show this screen.
  --version     Show version.
  -p <port> --port=<port>  Port to listen on.
  -b <auth> --basic-auth=<auth>   Enable basic-auth.
  -i <ips> --ips=<ips>  Allowed IP addresses.
  -l --list-dir  List Directory.
  --opbeat  Enable Opbeat.
  -o --open  Open in browser after start.
```
`dir` is where your static files are.

404 errors will return with `<dir>/.404.html`, with status code 404. If this file doesnt exist, the default error page will be shown.


### Configuration

##### `port`
The port for the server to listen on. Currently supports plain HTTP only

##### `basic-auth`
Enable basic-auth for all paths. Currently only supports single credentals.  

Format:`-b username:password`

##### `ips`
IP addresses that are allowed to connect to the server.

Format: `-i 192.168.1.100,192.168.1.101`

##### `list-dir`
Enables directory listing. Allow browseing

##### `opbeat`
Enable opbeat error reporting. `--opbeat` only enables this, configuration is done using [environment varables](https://opbeat.com/docs/articles/get-started-with-express/#appId).

##### `open`
Open the server in the browser one started. It will open in your default browser, and use url `http://0.0.0.0:<port>`.
