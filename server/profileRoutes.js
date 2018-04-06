const profileRouter = require('express').Router();
const employeeController = require('../database/models/employees.js')

profileRouter.post('/api/update_photo', async (req, res) => {
  try {
    let result = await employeeController.uploadPhoto(req.body)
    res.status(200).send(result)
  } catch(e) {
    res.status(400).end();
  }
})

profileRouter.post('/api/update_profile', async (req, res) => {
  try {  
    let result = await employeeController.updateProfile(req.body)
    res.status(200).send(result)
  } catch(e) {
    res.status(400).end();
  }
})

module.exports = profileRouter;