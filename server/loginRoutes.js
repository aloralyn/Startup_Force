const loginRouter = require('express').Router();
const db = require('../database/index.js');
const employeeController = require('../database/models/employees.js');
const bcrypt = require('bcrypt');
const firebase = require('firebase');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportjwt = require('passport-jwt');
const ExtractJwt = passportjwt.ExtractJwt;
const JwtStrategy = passportjwt.Strategy;

var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: 'itisbettertobecruelthanweak' // use firebase key
};

var strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  db.query(`SELECT * FROM employees WHERE id = ${jwt_payload.uid};`, (err, data) => {
    // console.log(data)
    if (data.rows.length) {
      next(null, data.rows[0].id);
    } else {
      next(null, false);
    }
  });
});

passport.use(strategy);

const comparePassword = (rawPw, hashedPw) => {
  // add bcrypt later
  // bcrypt.compare(rawPw, encryptPw, (err, exists) => !!exists);
  return (rawPw === hashedPw);
};

// once token is generated, send to Firebase (from Firebase docs)
// firebase.auth().signInWithCustomToken(token).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });

loginRouter.post('/login', (req, res) => {
  if (req.body.email && req.body.pw) {
    var email = req.body.email;
    var pw = req.body.pw;
  }
  db.query(`SELECT * FROM employees WHERE email = '${email}';`, (err, data) => {
    if (err) { console.log(err); }
    if (!data.rows.length) {
      res.status(401).json({message: 'no such user'});
    }
    else if (comparePassword(pw, data.rows[0].pw)) {
      var iat = Math.floor(new Date().getTime() / 1000);
      var payload = {
        uid: data.rows[0].id,
        alg: 'RS256',
        iss: 'brent.timothy.hagen@gmail.com',
        sub: 'brent.timothy.hagen@gmail.com',
        aud: 'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit',
        iat: iat,
        exp: iat + 3600
      };
      var token = jwt.sign(payload, jwtOptions.secretOrKey);
      db.query(`SELECT * FROM employees WHERE company_id = ${data.rows[0].company_id};`, (err, data2) => {
        if (err) { console.log(err); }
        else {
          var managers = [];
          data2.rows.forEach(emp => { if (emp.is_manager) { managers.push(emp); }});
          res.json({ 
            message: 'ok', 
            token: token, 
            user: data.rows[0], 
            users: data2.rows, 
            managers: managers 
          });
        }
      });
    } else {
      res.status(401).json({message: 'passwords did not match'});
    }
  });
});


loginRouter.get('/load', passport.authenticate('jwt', { session: false }), (req, res) => {
  var decoded = jwt.verify(req.headers.authorization.slice(4), jwtOptions.secretOrKey);
  db.query(`SELECT * FROM employees WHERE id = ${decoded.uid};`, (err, data) => {
    if (data.rows.length) {
      db.query(`SELECT * FROM employees WHERE company_id = ${data.rows[0].company_id};`, (err, data2) => {
        if (err) { console.log(err); }
        else {
          var managers = [];
          data2.rows.forEach(emp => { if (emp.is_manager) { managers.push(emp); }});
          res.json({ message: 'ok', user: data.rows[0], users: data2.rows, managers: managers });
        }
      });
    } else {
      console.log('something happened')
    }
  });
});

loginRouter.get('/secret', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json('yer token works');
});

module.exports = loginRouter;