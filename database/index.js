const pg = require('pg');
//const cf = require('../server/config.js');

const { Pool, Client } = require('pg');
//Guys, be sure to create your database in your postgres cli first before running your schema.sql file

// @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @
// @ DO NOT DELETE, CHRIS IS USING THIS CONFIG FOR LOCAL TESTING
// @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @
const config = {
  user: 'aloralynayran',
  // user: 'artemipatev',
  //user: 'christopherrigoli',
  // user: 'brenthagen',
  host: 'localhost',
  password: '',
  database: 'bmttools',
  port: 5432,
};
// @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @

// const config = {
//   user: cf.pgUser,
//   host: cf.pgHost,
//   password: cf.pgPassword,
//   database: cf.pgDatabase,
//   port: cf.pgPort
// }

const client = new Client(config)

client.connect()

client.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('An idle client has experienced an error', err.stack);
  } else {
    console.log('You have successfully connected to your db!')
  }
  client.end()
})

const pool = new Pool(config)

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}
