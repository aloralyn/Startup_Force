import axios from 'axios';

export const createCompany = (company, employee) => {
  return (dispatch) => {
    axios.post('/api/create_company', company)
      .then((response) => {
        employee.company_id = parseInt(response.data);
        axios.post('/api/create_first_employee', employee)
          .then((response) => {
          console.log('Company and admin successfully saved')
        })
      })
      .catch((err) => {
        console.log('There was an error', err)
      });
  };
};
