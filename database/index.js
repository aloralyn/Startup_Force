const pg = require('pg');

const { Pool, Client } = require('pg');

const config = {
  user:  process.env.PG_USER || 'aloralynayran',
  host: process.env.PG_HOST || 'localhost',
  password: process.env.PG_PASSWORD || '',
  database: process.env.PG_DATABASE || 'bmttools',
  port: process.env.PG_PORT || 5432
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
