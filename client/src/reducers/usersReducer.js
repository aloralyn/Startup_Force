import { LOGIN, FETCH_USERS, FETCH_MANAGERS, VERIFIED_USER } from '../actions/types';

const initialState = {
  user: {},
  users: [],
  managers: [],
  verified: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        user:  action.payload.user,
        users: action.payload.users,
        managers: action.payload.managers
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

