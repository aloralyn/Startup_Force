const db = require('../index.js');
const bcrypt = require('bcrypt');
const firebase = require('firebase');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// configuration?
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) {}
    if (!user) {

    }
    if (!user.validPassword(password)) {

    }
    return done(null, user);    
  });
}));

// compare password
const comparePassword = (rawPass, encryptPass) => {
  bcrypt.compare(rawPass, encryptPass, (err, exists) => !!exists);
};

// generate token, including firebase info
const generateToken = (name) => {

};

// return token if password matches, otherwise??
exports.loginCheck = async (preferred_name, password) => {
  let queryStr = `SELECT * FROM employees WHERE preferred_name = ${preferred_name};`;

  return db.query(queryStr)
    .then(res => {
        // what is proper formatting for password?
        if (comparePassword(password, res.password)) {
          return generateToken(preferred_name);
        } else {
          return false;
        }
      }
    ).catch(err => console.log(err.stack))
};
