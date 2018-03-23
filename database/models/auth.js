const db = require('../index.js');
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
  bcrypt.compare(rawPw, encryptPw, (err, exists) => !!exists);
};

// generate token, including firebase info
const generateToken = (name) => {

};

// return token if password matches, otherwise??
exports.loginCheck = async (email, password) => {
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

exports.logout = async () => {
  // to complete
}
