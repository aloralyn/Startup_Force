// @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @
// @ BOILER PLATE SERVER CONNECTION
// @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @

const express = require('express');
const parser = require('body-parser');
const router = require('./routes.js');
const app = express();

app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use('/', router);

app.set('port', 8001);

const port = 8001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports.app = app;
