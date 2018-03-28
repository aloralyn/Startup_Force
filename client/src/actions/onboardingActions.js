import axios from 'axios';

export const addEmployee = (state) => {
  return (dispatch) => {
    axios.post('/api/create_employee_profile', state)
      .then((response) => {
        console.log('Employee saved!')
      })
      .catch((err) => {
        console.log('There was an error', err)
      });
  };
};

export const addDepartment = (state) => {
  return (dispatch) => {
    axios.post('/api/create_department/1', state)
      .then((response) => {
        console.log('Department saved!')
      })
      .catch((err) => {
        console.log('There was an error', err)
      });
  };
};
