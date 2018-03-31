import axios from 'axios';
import { Router } from 'react-router';
import { getNotifications } from './messageActions.js';

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
    axios.get('/load')
      .then((response) => {
        // getNotifications(response.data.user.id, response.data.user.company_id)
        dispatch({
          type: 'LOGIN',
          payload: response.data
        });
        dispatch({
          type: 'VERIFIED_USER',
          payload: ''
        });
        // dispatch({
        //   type: 'GET_NOTIFICATIONS',
        //   payload: response.data.user.id
        // })
      })
      .catch((err) => {
        console.log('There was an error', err)
      });
  };
};

// export function load() {
//   // return (dispatch) => {
//     console.log('load')
//     axios.get('/load')
//       .then((response) => {
//         // console.log(response.data)
//         getNotifications(response.data.user.id, response.data.user.company_id)
//         return (dispatch) => {
//           dispatch({
//             type: 'LOGIN',
//             payload: response.data
//           });
//           dispatch({
//             type: 'VERIFIED_USER',
//             payload: ''
//           });
//         }
//         // getNotifications(response.data.user.id, response.data.user.company_id)
//       })
//       .catch((err) => {
//         console.log('There was an error', err)
//       });
//   // };
// };

export function login(state) {
  return (dispatch) => {
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
        getNotifications(response.data.user.id, response.data.user.company_id)
      })
      .catch((err) => {
        console.log('There was an error', err)
      });
  };
};

export const logout = () => dispatch => {
  localStorage.removeItem('authToken');
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

