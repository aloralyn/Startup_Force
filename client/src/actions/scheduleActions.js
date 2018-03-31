import { GET_SCHEDULES, GET_SCHEDULE, POST_SCHEDULE, EDIT_SCHEDULE, DELETE_SCHEDULE } from './types.js'
import axios from 'axios';


export const getSchedule = ( year, month, id ) => dispatch => {
	axios.get(`/schedule/${year}/${month}/${id}`)
	.then(schedule => {
		// console.log(schedule)
			dispatch({
			type: GET_SCHEDULE,
			payload: schedule.data.rows
		})
	}
		)
}

export const getSchedules = (year, month, id) => dispatch => {
	axios.get(`/employees/${id}`)
	.then(employees => {
		console.log(employees)
		axios.get(`/schedules/${year}/${month}/${id}`)
		.then(schedules => {
			console.log(schedules)
			dispatch({
				type: GET_SCHEDULES,
				payload: {
					employees: employees.data.rows,
					schedules: schedules.data.rows
				}
			})
		})
	})
}

export const editSchedule = ({ start, startEdit, finish, finishEdit, first_name, id }) => dispatch => {
	Promise.resolve(dispatch({
		type: EDIT_SCHEDULE,
		payload: { start, startEdit, finish, finishEdit, first_name, id }
	})).then(() => axios.post('/editSchedule', { id, start, startEdit, finish, finishEdit }))
}

export const postSchedule = ({ id, first_name, start, finish, year, month }) => dispatch => {
	Promise.resolve(dispatch({
		type: POST_SCHEDULE,
		payload: { start, finish, first_name, month, id }
	})).then(() => axios.post('/postSchedule', { id, start, finish, month, year }))
}

export const deleteSchedule = ({ start, finish, id }) => dispatch => {

	Promise.resolve(dispatch({
		type: DELETE_SCHEDULE,
		payload: { id, start, finish }
	})).then(() => axios.post('/deleteSchedule', { start, finish, id }))
}
