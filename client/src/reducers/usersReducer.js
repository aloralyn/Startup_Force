import { FETCH_USER, FETCH_USERS, FETCH_MANAGERS, VERIFIED_USER } from '../actions/types';

const initialState = {
  user: {},
  users: [],
  managers: [],
  verified: false
};

 // add a login reducer to set verified state
 // modify to select based on authenticated email
export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_USER:
      console.log(action.payload)
      return {
        ...state,
        user:  action.payload
      };
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload
      };
    case FETCH_MANAGERS: 
      return {
        ...state,
        managers: action.payload
      };
    case VERIFIED_USER:
      return {
        ...state,
        verified: !state.verified
      };
    default: 
      return state;
  }
}

