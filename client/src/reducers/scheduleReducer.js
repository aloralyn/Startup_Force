import { GET_SCHEDULES, GET_SCHEDULE, POST_SCHEDULE, EDIT_SCHEDULE, DELETE_SCHEDULE } from '../actions/types'

const initialState = {
	schedules: [],
	employees: [],
	schedule: [],
	fetchedMonthsForHome: [],
	fetchedMonthsForMaker: []
}

function scheduleReducer(state = initialState, action) {
	switch (action.type) {
		case GET_SCHEDULES: {
			let schedules = [...state.schedules, ...action.payload.schedules]
			let newMonth = [action.month, action.year].join(' ')
			let fetchedMonthsForMaker = [...state.fetchedMonthsForMaker, newMonth]
			return {
				...state,
				schedules,
				employees: action.payload.employees,
				fetchedMonthsForMaker
			}
		}
		case GET_SCHEDULE: {
			let newMonth = [action.month, action.year].join(' ');
			let payload = action.payload || []
			let schedule = [...state.schedule, ...payload];
			let fetchedMonthsForHome = [...state.fetchedMonthsForHome, newMonth]
			return {
				...state,
				schedule,
				fetchedMonthsForHome
			}
		}
		case EDIT_SCHEDULE: {
			const { start, startEdit, finish, finishEdit, first_name, id } = action.payload;
			let index = null;
			state.schedules.forEach((schedule, i) => {
				if (schedule.id === id
					&& schedule.start === start 
					&& schedule.finish === finish ) {
					index = i;
				}
			})
			let COPY = state.schedules.slice();
			COPY[index] = { first_name, id, start: startEdit, finish: finishEdit}
			return {
				...state,
				schedules: COPY,
			}
		}
		case POST_SCHEDULE: {
			let schedules = [...state.schedules, action.payload]
			return {
				...state,
				schedules,
			}
		}
		case DELETE_SCHEDULE: {
			const { start, finish, id } = action.payload;
			let index = null;
			state.schedules.forEach((schedule, i) => {
				if (schedule.id === id && schedule.start === start && schedule.finish === finish ) {
					index = i;
				}
			})
			let COPY = state.schedules.slice();
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
