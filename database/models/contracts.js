const db = require('../index.js');

// exports.addContract = (awardedTo, companyID, clientName, contractName, contractAmount, startDate, endDate, cb) => {
//   const values = [1, 1, clientName, contractName, contractAmount, startDate, endDate];
//   // @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @
//   // @ NOTE: awardedTo and companyID are INTEGER ID values.  Need to grab ID from database as well once fully implemented
//   // @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @
//   const queryString = 'INSERT INTO contracts (awared_to_id, company_id, client_name, contract_name, contract_amount, contract_start_date, contract_end_date) VALUES ($1, $2, $3, $4, $5, $6, $7);';
//   db.query(queryString, values, (err, result) => {
//     if (err) {
//       console.log('ERROR in db function addContract, error: ', err);
//     } else {
//       console.log('successful addition of contract to DB with result: ', result);
//       cb(result);
//     }
//   });
// };

// @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @
// @ NOTE: awardedTo and companyID are INTEGER ID values.  Need to grab ID from database as well once fully implemented
// @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @

exports.addContract = (awardedTo, companyID, clientName, contractName, contractAmount, startDate, endDate, cb) => {
  const values = [1, 1, clientName, contractName, contractAmount, startDate, endDate];
  const queryString = 'INSERT INTO contracts (awared_to_id, company_id, client_name, contract_name, contract_amount, contract_start_date, contract_end_date) VALUES ($1, $2, $3, $4, $5, $6, $7);';
  db.query(queryString, values)
    .then(result => cb(result))
    .catch(err => console.error('ERROR in db function addContract, error: ', err))
};

exports.getContract = (contractName, cb) => {
  const values = [contractName];
  const queryString = 'SELECT * FROM contracts WHERE contract_name=$1;';
  db.query(queryString, values)
    .then(result => cb(result))
    .catch(err => console.error('ERROR in db function getContract, error: ', err));
};
