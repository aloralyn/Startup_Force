const db = require('../index.js');

exports.retrieveEmployees = async (id) => {
  let queryStr = `SELECT * FROM employees WHERE company_id = ${id};`;

  return db.query(queryStr)
           .then(res => 
             res.rows
           ).catch(err => console.log(err.stack))
}

exports.retrieveEmployeeData = async (id, employeeId) => {
  let queryStr = `SELECT * FROM employees WHERE company_id = ${id} AND id = ${employeeId};`;

  return db.query(queryStr)
           .then(res => 
            res.rows
           ).catch(err => console.log(err.stack))
}


exports.createEmployeeProfile = function(input) {
  let queryStr = `INSERT INTO employees (company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number, linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw) 
    VALUES (${input.company_id}, '${input.first_name}', '${input.last_name}', '${input.preferred_name}', '${input.dob}', '${input.ssn}', '${input.gender}', '${input.street_1}', '${input.street_2}', '${input.city}', '${input.zip_code}', '${input.state}', '${input.email}', '${input.phone_number}', '${input.linkedin_url}', '${input.position}', '${input.employee_status}', '${input.start_date}', '${input.department}', '${input.division}', '${input.reports_to}', ${input.wage}, '${input.pay_per}', '${input.pay_type}', ${input.is_manager}, '${input.pw}');`;
  
  return db.query(queryStr, function(err, results) {
    if (err) 
      console.log('There was an error creating an employee', err);
  });
}

