// @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @
// @ BOILER PLATE SERVER CONNECTION @
// @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @

const express = require('express');
const parser = require('body-parser');
const router = require('./routes.js');
const path = require('path');

const scheduleRouter = require('./scheduleRoutes.js');
const reportsRouter = require('./reportsRoutes.js');
const loginRouter = require('./loginRoutes.js');
const profileRouter = require('./profileRoutes.js')

const app = express();
//const session = require('express-session');
const passport = require('passport');

app.use(parser.urlencoded({
  extended: true
}));

app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.use('/', router);
app.use('/', scheduleRouter);
app.use('/', reportsRouter);
app.use('/', loginRouter);
app.use('/', profileRouter);

//app.use('/*', (req, res) => res.redirect('/'));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './../client/dist/index.html'), (err) => {
    res.status(500).send(err);
  })
})

app.use(passport.initialize());

const port = process.env.PORT;

app.set('port', port);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports.app = app;
