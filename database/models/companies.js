const db = require('../index.js');

exports.createCompany = function(input) {
  let name = input.name;
  let address = input.address;
  let queryStr = `INSERT INTO companies (name, address) VALUES ('${name}', '${address}');`;
  
  return db.query(queryStr, function(err, results) {
    if (err) 
      console.log('There was an error creating this company', err);
  });
}

exports.updateCompany = function(id, input) {
  let name = input.name;
  let address = input.address;
  let queryStr = `UPDATE companies SET name='${name}', address='${address}' WHERE id=${id};`;

  return db.query(queryStr, function(err, results) {
    if (err) 
      console.log('There was an error creating this company', err);
  });
}