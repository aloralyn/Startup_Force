import { FETCH_USER, FETCH_MANAGERS } from '../actions/types';

const initialState = {
  user: {},
  users: [],
  managers: []
};
 // modify to select based on authenticated email
export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_USER:
      return {
        ...state,
        users: action.payload,
        user:  action.payload[0]
      };
    case FETCH_MANAGERS: 
      return {
        ...state,
        managers: action.payload
      }
    default: 
      return state;
  }
}

