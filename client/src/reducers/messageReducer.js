import { MESSAGE_USER, GET_MESSAGES } from '../actions/types.js';
import firebase from '../firebase.js';

const initialState = {
  messages: [`I'm a message`],
  messageUserId: null
};

function messageReducer(state = initialState, action) {
  switch(action.type) {
    case MESSAGE_USER:
      return Object.assign({}, state, {
        messageUserId: action.payload
      });
    case GET_MESSAGES:
      return Object.assign({}, state, {
        messages: Object.values(action.payload)
      });
  default:
    return state;
  }
}

export default messageReducer;