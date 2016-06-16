const express = require('express');

const PORT = process.env.PORT;
const serveDir = __dirname + '/site';

const directory = /\/$/;
const allFiles = /.*/;

const expressConfig = {
  dotfiles: 'deny',
  index: false,
  redirect: true
};

const app = express();

app.use(function (request, response, next) {
  // If path is directory then serve index.html
  if (directory.exec(request.url)) {
    request.url += '/index.html';
  }
  next();
});

app.use(
  express.static(serveDir, expressConfig)
);

// Cannot find any file
app.use(
  allFiles, express.static(serveDir + '/.404.html', expressConfig)
);

const server = app.listen(PORT, function () {
  const serverPort = server.address().port;
  console.log('Server started on port ' + serverPort);
});
