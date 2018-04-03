const db = require('../index.js');

// @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @
// @ NOTE: awardedTo and companyID are INTEGER ID values.  Need to grab ID from database as well once fully implemented
// @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @

exports.addContract = (awardedToId, companyID, clientName, contractName, contractAmount, startDate, endDate, contractDescription, cb) => {
  const values = [awardedToId, 1, clientName, contractName, contractAmount, startDate, endDate, contractDescription];
  // const queryString = 'INSERT INTO contracts (awarded_to, company_id, client_name, contract_name, contract_amount, contract_start_date, contract_end_date) VALUES ($1, $2, $3, $4, $5, $6, $7);';
  const queryString = 'INSERT INTO contracts (awarded_to, company_id, client_name, contract_name, contract_amount, contract_start_date, contract_end_date, contract_desc) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);';
  db.query(queryString, values)
    .then(result => cb(result))
    .catch(err => console.error('ERROR in db function addContract, error: ', err))
};

exports.getContract = (contractName, cb) => {
  const values = [contractName];
  const queryString = 'SELECT * FROM contracts WHERE contract_name=$1;';
  return db.query(queryString, values)
    .then(result => cb(result))
    .catch(err => console.error('ERROR in db function getContract, error: ', err));
};

exports.getAllContracts = (companyID) => {
  const values = [1] || [companyID];
  const queryString = 'SELECT employees.preferred_name, contracts.* FROM employees, contracts WHERE employees.id = awarded_to AND contracts.company_id = $1;';
  return db.query(queryString, values)
    .then(data => data.rows)
};

exports.getAllEmployees = (companyID, cb) => {
  const values = [1] || [companyID];
  const queryString = 'SELECT preferred_name FROM employees WHERE company_id = $1;';
  db.query(queryString, values)
    .then(result => cb(result))
    .catch(err => console.error('ERROR in db function getAllEmployees'));
};

exports.getAllContractData = (companyID, cb) => {
  const values = [1] || [companyID];
  // const queryString = 'SELECT * FROM contracts WHERE company_id = $1;';
  const queryString = 'SELECT employees.preferred_name, contracts.* FROM contracts INNER JOIN employees ON contracts.awarded_to=employees.id WHERE contracts.company_id=$1;';
  db.query(queryString, values)
    .then(result => cb(result))
    .catch(err => console.error('ERROR in db function getAllEmployees'));
};
