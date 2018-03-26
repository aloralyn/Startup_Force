const loginRouter = require('express').Router();
const db = require('../database/index.js');
const bcrypt = require('bcrypt');
const firebase = require('firebase');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportjwt = require('passport-jwt');
const ExtractJwt = passportjwt.ExtractJwt;
const JwtStrategy = passportjwt.Strategy;

// passport.use(new LocalStrategy((email, password, done) => {
//   User.findOne({ email: email }, (err, user) => {
//     if (err) {}
//     if (!user) {

//     }
//     if (!user.validPassword(password)) {

//     }
//     return done(null, user);    
//   });
// }));

var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: 'itisbettertobecruelthanweak'
};

var users = [{id: 1, email: 'user@user.com', pw: 'pw'}];

var strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  console.log('payload received', jwt_payload); 
  // var user = users[_.findIndex(users, {id: jwt_payload.id})];
  // var user = users[0];
  // substitute with database call: 
  db.query(`SELECT * FROM employees WHERE id = ${jwt_payload.id};`, (err, data) => {
    console.log(data)
    // if (user) {
    //   next(null, user);
    // } else {
    //   next(null, false);
    // }
  });
});

passport.use(strategy);

// compare password
const comparePassword = (rawPw, encryptPw) => {
  // add bcrypt later
  // bcrypt.compare(rawPw, encryptPw, (err, exists) => !!exists);
  console.log('passwords', rawPw, encryptPw);
  return (rawPw === encryptPw);
};

// generate token
const generateToken = (name) => {

};

// once token is generated, send to Firebase (from Firebase docs)
// firebase.auth().signInWithCustomToken(token).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });

// return token if password matches, otherwise??
const loginCheck = async (email, password) => {
  let queryStr = `SELECT * FROM employees WHERE email = ${email};`;
  return db.query(queryStr)
    .then(res => {
        // what is proper formatting for password from db?
        if (comparePassword(password, res.pw)) {
          return true;
        } else {
          return false;
        }
      }
    ).catch(err => console.log(err.stack))
};

const logout = async () => {
  // to complete
}

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
      var payload = {id: data.rows[0].id};
      var token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({message: 'ok', token: token});
    } else {
      res.status(401).json({message: 'passwords did not match'});
    }
  });
});

loginRouter.get('/logout', async (req, res) => {
  //let id = req.params.id;
  try {
    await logout(id)
    res.status(202).end();
  } catch(e) {
    res.status(400).end();
  }
});

module.exports = loginRouter;