import axios from 'axios';
import { Router } from 'react-router';
//import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

export function fetchUsers(email) {
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

export function login(state) {
  return (dispatch) => {
    axios.post('/login', state)
      .then((response) => {
        console.log('logged in', response)
        localStorage.setItem('authToken', response.data.token);
        window.location.reload();
        //Router.refresh();
        //fetchUsers(email);
        // dispatch({
        //   type: FETCH_USER,
        //   payload: state.email
        // });
      })
      .catch((err) => {
        console.log('There was an error', err)
      });
  };
};

export function logout() {
  console.log('logout');
  localStorage.removeItem('authToken');
  window.location.reload();
  // dispatch action to reset state?
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

