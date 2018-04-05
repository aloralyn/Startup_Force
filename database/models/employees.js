const db = require('../index.js');

exports.retrieveEmployees = (id) => {
  let queryStr = `SELECT * FROM employees WHERE company_id = ${id};`;

  return db.query(queryStr)
           .then(res =>
             res.rows
           ).catch(err => console.log(err.stack))
}

exports.retrieveEmployeeData = (id, employeeId) => {
  let queryStr = `SELECT * FROM employees WHERE company_id = ${id} AND id = ${employeeId};`;

  return db.query(queryStr)
           .then(res =>
            res.rows
           ).catch(err => console.log(err.stack))
};

exports.createFirstEmployee = (input) => {
  let queryStr = `INSERT INTO employees (company_id, first_name, last_name, email, pw, main_admin) VALUES (${input.company_id}, '${input.first_name}', '${input.last_name}', '${input.email}', '${input.pw}', true);`;
  return db.query(queryStr, (err, results) => {
    if (err)
      console.log('There was an error creating an employee', err);
  });
};

exports.createEmployeeProfile = (input) => {
  let queryStr = `INSERT INTO employees (company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number, linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw, profilepicid, personal_email) VALUES (${input.company_id}, '${input.first_name}', '${input.last_name}', '${input.preferred_name}', '${input.dob}', '${input.ssn}', '${input.gender}', '${input.street_1}', '${input.street_2}', '${input.city}', '${input.zip_code}', '${input.state}', '${input.email}', '${input.phone_number}', '${input.linkedin_url}', '${input.position}', '${input.employee_status}', '${input.start_date}', '${input.department}', '${input.division}', ${input.reports_to}, ${input.wage}, '${input.pay_per}', '${input.pay_type}', ${input.is_manager}, '${input.pw}', 'mwwz0bjpsdrqiuuldkmy', '${input.personal_email}');`;
  return db.query(queryStr, (err, results) => {
    if (err)
      console.log('There was an error creating an employee', err);
  });
};

exports.uploadPhoto = (input) => {
  let queryStr = `UPDATE employees SET profilePicId='${input.profilePicId}' WHERE id=${input.id} RETURNING *;`;
  return db.query(queryStr)
    .then(res => res.rows[0])
      .catch(err => console.log(err.stack))
}

exports.retrieveManagers = (input) => {
  let queryStr = `SELECT * FROM employees WHERE company_id = ${input} AND is_manager = true;`;
  return db.query(queryStr)
           .then(res =>
            res.rows
           ).catch(err => console.log(err.stack))
};

exports.updateProfile = (input) => {
  const v = [input.preferred_name, input.street_1, input.street_2, input.city, input.zip_code, input.state, input.personal_email, input.phone_number, input.linkedin_url, input.pw];
  let queryStr = `UPDATE employees SET preferred_name='${v[0]}', street_1='${v[1]}', street_2='${v[2]}', city='${v[3]}', zip_code='${v[4]}', state='${v[5]}',  personal_email='${v[6]}', phone_number='${v[7]}', linkedin_url='${v[8]}', pw='${v[9]}'  WHERE id=${input.id} RETURNING *;`;

  return db.query(queryStr)
           .then(res =>
            res.rows[0]
          ).catch( err => console.log(err.stack));
}