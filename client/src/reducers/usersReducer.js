import { FETCH_USER } from '../actions/types';

const initialState = {
  user: {},
  users: [],
  managers: []
};

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

