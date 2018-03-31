import { MESSAGE_USER, GET_MESSAGES, GET_NOTIFICATIONS, CLEAR_NOTIFICATION } from '../actions/types.js';
import firebase from '../firebase.js';

const initialState = {
  messages: [`Send some messages!`],
  messageUserId: null,
  notifications: []
};

function messageReducer(state = initialState, action) {
  switch(action.type) {
    case MESSAGE_USER:
      return Object.assign({}, state, {
        messageUserId: action.payload,
        notifications: Object.assign({}, state.notifications, state.notifications[action.payload] = undefined)
      });
    case GET_MESSAGES:
      if (action.payload) {
        return Object.assign({}, state, {
          messages: Object.values(action.payload)
        });
      } else {
        return Object.assign({}, state, {
          messages: [`Send some messages!`]
        });
      }
    case GET_NOTIFICATIONS:
      return Object.assign({}, state, {
        notifications: action.payload
      });
    case CLEAR_NOTIFICATION:
      return Object.assign({}, state, {
        notifications: []
      });
  default:
    return state;
  }
}

export default messageReducer;