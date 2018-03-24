const loginRouter = require('express').Router();
const db = require('../database/index.js');
const bcrypt = require('bcrypt');
const firebase = require('firebase');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// configuration?
passport.use(new LocalStrategy((email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) {}
    if (!user) {

    }
    if (!user.validPassword(password)) {

    }
    return done(null, user);    
  });
}));

// compare password

const comparePassword = (rawPw, encryptPw) => {
  // add bcrypt later
  // bcrypt.compare(rawPw, encryptPw, (err, exists) => !!exists);
  console.log('passwords', rawPw, encryptPw);
  return (rawPw === encryptPw);
};

// generate token, including firebase info
const generateToken = (name) => {

};

// return token if password matches, otherwise??
const loginCheck = async (email, password) => {
  let queryStr = `SELECT * FROM employees WHERE email = ${email};`;

  return db.query(queryStr)
    .then(res => {
        // what is proper formatting for password?
        if (comparePassword(password, res.pw)) {
          return generateToken(email);
        } else {
          return false;
        }
      }
    ).catch(err => console.log(err.stack))
};

const logout = async () => {
  // to complete
}

loginRouter.get('/api/login', async (req, res) => {
  try {
    let result = await loginCheck(req.body.preferred_name, req.body.password)
    // if result, send result; otherwise send 403
    if (result) { res.status(200).send(result); }
    else { res.status(403).end(); }
  } catch(e) {
    res.status(400).end();
  }
});

loginRouter.get('/api/logout', async (req, res) => {
  //let id = req.params.id;
  try {
    await logout(id)
    res.status(202).end();
  } catch(e) {
    res.status(400).end();
  }
});

module.exports = loginRouter;