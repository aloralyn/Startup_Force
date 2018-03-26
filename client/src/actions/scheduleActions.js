import { GET_SCHEDULES, POST_SCHEDULE, EDIT_SCHEDULE, DELETE_SCHEDULE } from './types.js'
import axios from 'axios';


const getSchedule = ( year, month, managerId ) => dispatch => {
	axios.get(`/schedule/${year}/${month}/${managerId}`)
	.then(schedule => {
		var array = [];
		console.log("SCHEDULE!!!!: ", schedule)
		schedule.data.rows.map(empl => {
			if (!array.includes(empl.first_name)) {
				array.push(empl.first_name)
			}
		});
			dispatch({
			type: GET_SCHEDULES,
			payload: schedule.data.rows,
			employees: array
		})
	}
		)
}

const editSchedule = ({ start, startEdit, finish, finishEdit, first_name, id }) => dispatch => {

	Promise.resolve(dispatch({
		type: EDIT_SCHEDULE,
		payload: { start, startEdit, finish, finishEdit, first_name, id }
	})).then(() => axios.post('/editSchedule', { start, startEdit, finish, finishEdit, first_name }))
}

const postSchedule = ({ start, finish, month, first_name, year }) => dispatch => {

	axios.post('/postSchedule', { first_name, start, finish, month, year } ).then(data => {
		console.log("--------",data)
		dispatch({
			type: POST_SCHEDULE,
			payload: {start, finish, first_name, month, id: data.data.id}
		})
	})
}

const deleteSchedule = ({ start, finish, id }) => dispatch => {

	Promise.resolve(dispatch({
		type: DELETE_SCHEDULE,
		payload: { id, start, finish }
	})).then(() => axios.post('/deleteSchedule', { start, finish, id }))
}


module.exports = {
  getSchedule,
  postSchedule,
  deleteSchedule,
  editSchedule,

};
