const db = require('../index.js');

exports.createCompany = function(input) {
  let queryStr = `INSERT INTO companies (name, street_1, street_2, city, zip_code, state, website) VALUES ('${input.name}', '${input.street_1}', '${input.street_2}', '${input.city}', '${input.zip_code}', '${input.state}', '${input.website}');`;
  
  return db.query(queryStr, function(err, results) {
    if (err) 
      console.log('There was an error creating this company', err);
  });
}

exports.updateCompany = function(id, input) {
  console.log(input)
  let queryStr = `UPDATE companies SET name='${input.name}', street_1='${input.street_1}', street_2='${input.street_2}', city='${input.city}', zip_code='${input.zip_code}', state='${input.state}', website='${input.website}' WHERE id=${id};`;

  return db.query(queryStr, function(err, results) {
    if (err) 
      console.log('There was an error creating this company', err);
  });
}