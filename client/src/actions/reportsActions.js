import axios from 'axios';
import { GET_EMPLOYEE_DATA } from './types.js';

export const getEmployeeData = (testvar) => (dispatch) => {
  console.log('test variable: ', testvar);
  axios.post('/get/employee/data', {
    data: 'data',
  })
    .then((res) => {
      dispatch({
        type: GET_EMPLOYEE_DATA,
        payload: res.data.rows,
      });
      return res;
    })
    .catch((err) => {
      console.log('ERROR in handleDropdownClick axios post, error: ', err);
    });
};
