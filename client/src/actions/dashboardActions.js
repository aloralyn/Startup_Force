import axios from 'axios';

export function fetchUsers() {
  return (dispatch) => {
    axios.get('/api/all_employees/1')
      .then((response) => {
        dispatch({
          type: 'FETCH_USER',
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: 'FETCH_USERS_REJECTED',
          payload: err,
        });
      });
  };
}

export const fetchManagers = (companyId) => {
  return (dispatch) => {
    axios.get('/api/all_managers', companyId)
      .then((response) => {
        dispatch({
          type: 'FETCH_MANAGERS',
          payload: response.data
        });
      })
  };
}

