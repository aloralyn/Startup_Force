const reportsRouter = require('express').Router();
const db = require('../database/index.js');

reportsRouter.post('/get/employee/data', (req, res) => {
  db.query('SELECT * FROM companies', (err, results) => {
    res.status(200).send(results);
  });
});

module.exports = reportsRouter;
