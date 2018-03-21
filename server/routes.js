const bmtRouter = require('express').Router();
const companyController = require('../database/models/companies.js');
const departmentController = require('../database/models/departments.js');
const employeeController = require('../database/models/employees.js');

const async = require('asyncawait/async');
const await = require('asyncawait/await');

bmtRouter.post('/api/create_company', async (req, res) => {
  try {
    await companyController.createCompany(req.body)
    res.status(200).end();
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



bmtRouter.post('/api/create_employee_profile', async (req, res) => {
  try {
    await employeeController.createEmployeeProfile(req.body)
    res.status(200).end();
  } catch(e) {
    res.status(400).end();
  }
});

module.exports = bmtRouter;