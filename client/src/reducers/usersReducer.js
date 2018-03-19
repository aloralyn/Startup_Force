import { FETCH_USER } from '../actions/types';

const initialState = {
  user: {},
  users: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_USER:
      return {
        ...state,
        users: action.payload,
        user:  action.payload[0]
      };
    default: 
      return state;
  }
}
