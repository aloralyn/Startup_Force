import { MESSAGE_USER, GET_MESSAGES } from './types.js';
import firebase from '../firebase.js';

const setUser = (userFrom, userTo) => {
  // insert for user1_user2 ?
  // take user ids, order ascending
  if (userTo < userFrom) { return firebase.database().ref(userTo + '_' + userFrom); }
  if (userFrom < userTo) { return firebase.database().ref(userFrom + '_' + userTo); }
};

export const sendMessage =  (message, time, name, userFrom, userTo) => dispatch => {
  // console.log('message, time', message, time)
  // console.log('log more')
  setUser(userFrom, userTo).push().set({
    name: name,
    time: time,
    message: message
  });
};

export const getMessages = (userFrom, userTo) => dispatch => {
  setUser(userFrom, userTo).off();
  setUser(userFrom, userTo).on('value', snap => {
    dispatch({
  	  type: GET_MESSAGES,
      payload: snap.val()
    });
  });
};

export const messageUser = (user) => dispatch => {
  return dispatch({
    type: MESSAGE_USER,
	  payload: user
	});
};