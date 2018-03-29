import axios from 'axios';
import { Router } from 'react-router';
//import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// modified to dispatch FETCH_USERS - based on user already logged in
export function fetchUsers(email) {
  return (dispatch) => {
    axios.get('/api/all_employees/1')
      .then((response) => {
        dispatch({
          type: 'FETCH_USERS',
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

// dispatches FETCH_USER once user logged in
export function login(state) {
  return (dispatch) => {
    axios.post('/login', state)
      .then((response) => {
        console.log('logged in', response)
        localStorage.setItem('authToken', response.data.token);
        dispatch({
          type: 'FETCH_USER',
          payload: response.data.user
        });
        dispatch({
          type: 'VERIFIED_USER',
          payload: ''
        });
      })
      .catch((err) => {
        console.log('There was an error', err)
      });
  };
};

export const logout = () => dispatch => {
  console.log('logout')
  localStorage.removeItem('authToken');
  dispatch({
    type: 'VERIFIED_USER',
    payload: ''
  });
};

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

