import { GET_SCHEDULES, POST_SCHEDULE, EDIT_SCHEDULE, DELETE_SCHEDULE } from '../actions/types'

const initialState = {
	schedules: [],
	employees: []
}

function scheduleReducer(state = initialState, action) {
	switch (action.type) {
		case GET_SCHEDULES: {
			return {
				...state,
				schedules: action.payload,
				employees: action.employees
			}
		}
		case EDIT_SCHEDULE: {
			const { start, startEdit, finish, finishEdit, first_name, id } = action.payload;
			var index = null;
			state.schedules.forEach((schedule, i) => {
				if ( schedule.first_name === first_name 
					&& schedule.start === start 
					&& schedule.finish === finish ) {
					index = i;
				}
			})
			var COPY = state.schedules.slice();
			COPY[index] = { first_name, id, start: startEdit, finish: finishEdit}
			return {
				...state,
				schedules: COPY,
			}
		}
		case POST_SCHEDULE: {
			const { start, finish, month, id, first_name } = action.payload;
			var schedules = [...state.schedules, action.payload]
			return {
				...state,
				schedules,
			}
		}
		case DELETE_SCHEDULE: {
			const { start, finish, id } = action.payload;
			var index = null;
			state.schedules.forEach((schedule, i) => {
				if (schedule.id === id && schedule.start === start && schedule.finish === finish ) {
					index = i;
				}
			})
			var COPY = state.schedules.slice();
			COPY.splice(index, 1);

			return {
				...state,
				schedules: COPY,
			}
		}
		default:
			return state
	}
}

export default scheduleReducer
