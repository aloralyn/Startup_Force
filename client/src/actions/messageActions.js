import { MESSAGE_USER, GET_MESSAGES } from './types.js';
import firebase from '../firebase.js';

const setUser = (user) => {
  // insert for user1_user2 ?
  // take user ids, order ascending
  return firebase.database().ref(user);
};

export const sendMessage =  (message, user) => dispatch => {
  setUser(user).push().set(message);
};

export const getMessages = (user) => dispatch => {
  setUser(user).off();
  setUser(user).on('value', snap => {
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