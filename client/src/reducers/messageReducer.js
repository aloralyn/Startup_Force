import { MESSAGE_USER, GET_MESSAGES } from '../actions/types.js';
import firebase from '../firebase.js';

const initialState = {
  messages: [`Send some messages!`],
  messageUserId: null
};

function messageReducer(state = initialState, action) {
  switch(action.type) {
    case MESSAGE_USER:
      return Object.assign({}, state, {
        messageUserId: action.payload
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
  default:
    return state;
  }
}

export default messageReducer;