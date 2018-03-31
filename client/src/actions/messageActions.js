import { MESSAGE_USER, GET_MESSAGES, GET_NOTIFICATIONS, CLEAR_NOTIFICATION } from './types.js';
import firebase from '../firebase.js';

const setMessageUser = (userFrom, userTo, company_id) => {
  let path = ''
  if (userTo < userFrom) { path = 'companies/' + company_id + '/messages/' + userTo + '_' + userFrom; }
  if (userFrom < userTo) { path = 'companies/' + company_id + '/messages/' + userFrom + '_' + userTo; }
  return firebase.database().ref(path);
};

const sendNotificationToUser = (userFrom, userTo, company_id) => {
  let path = path = 'companies/' + company_id + '/notifications/' + userTo + '/' + userFrom;
  return firebase.database().ref(path);
};

export const sendMessage =  (message, time, name, userFrom, userTo, company_id) => dispatch => {
  setMessageUser(userFrom, userTo, company_id).push().set({
    name: name,
    time: time,
    message: message
  });
  sendNotificationToUser(userFrom, userTo, company_id).push().set({
    messageWaiting: true
  })
};

export const getMessages = (userFrom, userTo, company_id) => dispatch => {
  setMessageUser(userFrom, userTo, company_id).off();
  setMessageUser(userFrom, userTo, company_id).on('value', snap => {
    dispatch({
  	  type: GET_MESSAGES,
      payload: snap.val()
    });
  });
};

// setting path to retrieve notifications
const setNotificationPath = (user, company_id) => {
  let path = path = 'companies/' + company_id + '/notifications/' + user;
  return firebase.database().ref(path);
};

export const getNotifications = (user, company_id) => dispatch => {
  // console.log('notifications', user, company_id)
  setNotificationPath(user, company_id).on('value', snap => {
    dispatch({
      type: GET_NOTIFICATIONS,
      payload: snap.val()
    });
  });
  //setNotificationPath(user, company_id).off();
};

// setting path to erase notifications for the user clicked
// const eraseNotificationPath = (user, userFrom, company_id) => {
//   let path = path = 'companies/' + company_id + '/notifications/' + user + '/' + userFrom;
//   return firebase.database().ref(path);
// };

export const eraseNotification = (user, userFrom, company_id) => {
  console.log('erase notification')
  let path = path = 'companies/' + company_id + '/notifications/' + user + '/' + userFrom;
  firebase.database().ref(path).remove();
}

export const messageUser = (user) => dispatch => {
  return (
    dispatch({
      type: MESSAGE_USER,
  	  payload: user
  	})
  );
};

export const clearNotification = (user) => dispatch => {
  return (
    dispatch({
      type: CLEAR_NOTIFICATION,
      payload: user
    })
  );
}