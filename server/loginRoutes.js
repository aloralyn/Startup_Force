const loginRouter = require('express').Router();
const db = require('../database/index.js');
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
  console.log('payload received', jwt_payload); 
  db.query(`SELECT * FROM employees WHERE id = ${jwt_payload.id};`, (err, data) => {
    console.log(data)
    if (data.rows.length) {
      next(null, data.rows[0].id);
    } else {
      next(null, false);
    }
  });
});

passport.use(strategy);

// compare password
const comparePassword = (rawPw, hashedPw) => {
  // add bcrypt later
  // bcrypt.compare(rawPw, encryptPw, (err, exists) => !!exists);
  console.log('passwords', rawPw, hashedPw);
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
      res.json({message: 'ok', token: token});
    } else {
      res.status(401).json({message: 'passwords did not match'});
    }
  });
});

loginRouter.get('/secret', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json('yer token works');
});

// possible logout route
// loginRouter.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/login');
// });

module.exports = loginRouter;