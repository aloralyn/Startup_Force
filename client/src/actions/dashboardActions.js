import axios from 'axios';
import { Router } from 'react-router';
import { endNotifications, endMessagingListener } from './messageActions.js';
import moment from 'moment';

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

export function load() {
  return (dispatch) => {
    let year = moment().format('YYYY')
    let month = moment().format('MMM')
    axios.get('/load')
      .then((response) => {
        dispatch({
          type: 'LOGIN',
          payload: response.data
        });
        dispatch({
          type: 'VERIFIED_USER',
          payload: ''
        });
        axios.get(`/schedule/${year}/${month}/${response.data.user.id}`)
          .then(schedule => {
            dispatch({
              type: 'GET_SCHEDULE',
              payload: schedule.data.rows,
              month: month,
              year: year
            })
          })
      })
      .catch((err) => {
        console.log('There was an error', err)
      });
  };
};

export function login(state) {
  return (dispatch) => {
    let year = moment().format('YYYY')
    let month = moment().format('MMM')
    axios.post('/login', state)
      .then((response) => {
        localStorage.setItem('authToken', response.data.token);
        dispatch({
          type: 'LOGIN',
          payload: response.data
        });
        dispatch({
          type: 'VERIFIED_USER',
          payload: ''
        });
        axios.get(`/schedule/${year}/${month}/${response.data.user.id}`)
          .then(schedule => {
            dispatch({
              type: 'GET_SCHEDULE',
              payload: schedule.data.rows,
              month: month,
              year: year
            })
          })
      })
      .catch((err) => {
        console.log('There was an error', err)
      });
  };
};

export const logout = (user, messageUserId, company_id) => {
  localStorage.removeItem('authToken');
  endNotifications(user, company_id);
  endMessagingListener(user, messageUserId, company_id);
  return dispatch => {
    dispatch({
      type: 'VERIFIED_USER',
      payload: ''
    });
    dispatch({
      type: 'LOGIN',
      payload: { user: {}, users: [], managers: [] }
    });
    dispatch({
      type: 'FETCH_USERS',
      payload: []
    });
    dispatch({
      type: 'CLEAR_NOTIFICATIONS',
      payload: ''
    });
    dispatch({
      type: 'MESSAGE_USER',
      payload: null
    });
  }
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

