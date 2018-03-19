// @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @
// @ BOILER PLATE SERVER CONNECTION
// @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @

const express = require('express');
const parser = require('body-parser');
const app = express();

app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.set('port', 8001);

const port = 8001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports.app = app;
