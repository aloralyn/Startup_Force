import axios from 'axios';

export function addEmployee(state) {
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

export function addDepartment(state) {
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
