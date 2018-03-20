const pg = require('pg');

const { Pool, Client } = require('pg');
//Guys, be sure to create your database in your postgres cli first before running your schema.sql file
const config = {
  user: "",
  host: "localhost",
  password: "",
  database: "bmttools"
}

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

