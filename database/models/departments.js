const db = require('../index.js');

exports.createDepartment = function(id, input) {
  let name = input.name;
  let division = input.division;
  let queryStr = `INSERT INTO departments (company_id, name, division) VALUES (${id}, '${name}', '${division}');`;
  
  return db.query(queryStr, function(err, results) {
    if (err) 
      console.log('There was an error creating this department', err);
  });
}

exports.updateDepartment = function(id, input) {
  let name = input.name;
  let department_id = input.id;
  let division = input.division;
  let queryStr = `UPDATE departments SET name='${name}', division='${division}' WHERE id=${department_id} AND company_id=${id};`

  return db.query(queryStr, function(err, results) {
    if (err) 
      console.log('There was an error updating this department', err);
  });
}