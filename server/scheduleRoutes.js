const scheduleRouter = require('express').Router();
const db = require('../database/index.js');

scheduleRouter.get('/schedule/:year/:month/:id', (req, res) => {
	db.query(`select e.id, e.first_name, s.start, s.finish from employees e right join schedules s on e.id = s.user_id where e.id = '${req.params.id}' and s.month='${req.params.month}' and s.year='${req.params.year}';`, (err, data) => {
		res.send(data);
	})
})

scheduleRouter.get('/schedules/:year/:month/:id', (req, res) => {
	db.query(`select e.first_name, e.id, s.start, s.finish from employees e right join schedules s on e.id=s.user_id where reports_to=${req.params.id};`, (err, data) => {
		res.send(data);
	})
})

scheduleRouter.get('/employees/:id', (req, res) => {
	db.query(`select first_name, id from employees where reports_to=${req.params.id};`, (err, data) => {
		res.send(data)
	})
})

scheduleRouter.post('/postSchedule', (req, res) => {
	const { first_name, start, finish, month, year } = req.body;
	db.query(`select id from employees where first_name='${first_name}';`, (err, here) => {
	
		db.query(`insert into schedules (user_id, start, finish, month, year ) values (${here.rows[0].id}, '${start}','${finish}', '${month}', ${year});`, (err, data) => {
			console.log("------", month, year)
			res.send({id: here.rows[0].id})
		})
	})
})

scheduleRouter.post('/editSchedule', (req, res) => {
	const {  start, finish, startEdit, finishEdit, first_name } = req.body;
	db.query(`select id from employees where first_name='${first_name}';`, (err, here) => {
		db.query(`update schedules set start='${startEdit}', finish='${finishEdit}' where user_id=${here.rows[0].id} and start='${start}' and finish='${finish}';`, (err, data) => {
			res.send();
		})
	})
})

scheduleRouter.post('/deleteSchedule', (req, res) => {
	const { id, start, finish } = req.body;
	db.query(`delete from schedules where user_id=${id} and start='${start}' and finish='${finish}';`, (err, data) => {
			res.send();
	})
})


module.exports = scheduleRouter;