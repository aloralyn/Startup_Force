const db = require('../index.js');

exports.addContract = (awardedTo, companyID, clientName, contractName, contractAmount, startDate, endDate, cb) => {
  const queryString = 'INSERT INTO contracts (awaredTo_ID, company_id, clientName, contractName, contractAmount, contractStartDate, contractEndDate) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(queryString, [awardedTo, companyID, clientName, contractName, contractAmount, startDate, endDate], (err, result) => {
    if (err) {
      console.log('ERROR in db function addContract, error: ', err);
    } else {
      cb(result);
    }
  });
};

exports.addContract = (awardedTo, companyID, clientName, contractName, contractAmount, startDate, endDate, cb) => {
  const queryString = 'INSERT INTO contracts (awaredTo_ID, company_id, clientName, contractName, contractAmount, contractStartDate, contractEndDate) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(queryString, [awardedTo, companyID, clientName, contractName, contractAmount, startDate, endDate], (err, result) => {
    if (err) {
      console.log('ERROR in db function addContract, error: ', err);
    } else {
      cb(result);
    }
  });
};
