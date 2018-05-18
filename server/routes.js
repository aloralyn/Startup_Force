const bmtRouter = require('express').Router();
const companyController = require('../database/models/companies.js');
const departmentController = require('../database/models/departments.js');
const employeeController = require('../database/models/employees.js');
const contractsController = require('../database/models/contracts.js');

bmtRouter.post('/api/create_company', async (req, res) => {
  try {
    let result = await companyController.createCompany(req.body)
    res.status(200).send(result.toString());
  } catch(e) {
    res.status(400).end();
  }
});

bmtRouter.post('/api/update_company/:id', async (req, res) => {
  let id = req.params.id;

  try {
    await companyController.updateCompany(id, req.body)
    res.status(200).end();
  } catch(e) {
    res.status(400).end();
  }
});

bmtRouter.post('/api/create_department/:id', async (req, res) => {
  let id = req.params.id;

  try {
    await departmentController.createDepartment(id, req.body)
    res.status(200).end();
  } catch(e) {
    res.status(400).end();
  }
});

bmtRouter.post('/api/update_department/:id', async (req, res) => {
  let id = req.params.id;

  try {
    await departmentController.updateDepartment(id, req.body)
    res.status(200).end();
  } catch(e) {
    res.status(400).end();
  }
});

bmtRouter.get('/api/all_employees/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let result = await employeeController.retrieveEmployees(id)
    res.status(200).send(result);
  } catch(e) {
    res.status(400).end();
  }
});

bmtRouter.post('/api/add/contract', (req, res) => {
  const { clientName, contractName, contractAmount, awardedToId, contractStartDate, contractEndDate, contractDescription } = req.body;
  contractsController.addContract(awardedToId, 1, clientName, contractName, contractAmount, contractStartDate, contractEndDate, contractDescription, (data) => {
    res.status(201).send();
  });
});

bmtRouter.post('/api/get/contract', (req, res) => {
  const { contractName } = req.body;
  contractsController.getContract(contractName, (data) => res.status(200).send(data.rows));
});

bmtRouter.post('/api/get/contract/all', (req, res) => {
  const { companyID } = req.body;
  contractsController.getAllContracts(companyID)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

bmtRouter.post('/api/get/contract/all/data', (req, res) => {
  const { companyID } = req.body;
  contractsController.getAllContractData(companyID, (data) => res.status(200).send(data.rows));
});

bmtRouter.post('/api/get/employees/all', (req, res) => {
  const { companyID } = req.body;
  contractsController.getAllEmployees(companyID, (data) => res.status(200).send(data.rows));
})

bmtRouter.post('/api/employee/:id', async (req, res) => {
  let id = req.params.id;
  let employeeId = req.body.id;
  try {
    let result = await employeeController.retrieveEmployeeData(id, employeeId)
    res.status(200).send(result[0]);
  } catch(e) {
    res.status(400).end();
  }
});

bmtRouter.post('/api/all_managers', async (req, res) => {
  try {
    let result = await employeeController.retrieveManagers(id)
    res.status(200).send(result);
  } catch(e) {
    res.status(400).end();
  }
});

bmtRouter.post('/api/create_first_employee', async (req, res) => {
  try {
    await employeeController.createFirstEmployee(req.body)
    res.status(200).end();
  } catch(e) {
    res.status(400).end();
  }
});

bmtRouter.post('/api/create_employee_profile', async (req, res) => {
  try {
    await employeeController.createEmployeeProfile(req.body)
    res.status(200).end();
  } catch(e) {
    res.status(400).end();
  }
});


module.exports = bmtRouter;
