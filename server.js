const express = require('express');

const PORT = process.env.PORT;
const serveDir = __dirname + '/site/';

const expressConfig = {
  dotfiles: 'deny',
  index: false,
  redirect: true
};

const app = express();

app.use(
  express.static(serveDir, expressConfig)
);

const server = app.listen(PORT, function () {
  const serverPort = server.address().port;
  console.log('Server started on port ' + serverPort);
});
