import { GET_EMPLOYEE_DATA } from '../actions/types.js';

const initialState = {
  currentChart: 'test',
  chartData: null,
};

function reportsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEE_DATA:
      return Object.assign({}, state, {
        chartData: action.payload,
      });
    default:
      return state;
  }
}

export default reportsReducer;
