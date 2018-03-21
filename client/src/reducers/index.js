import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import users from './usersReducer.js';
import messageReducer from './messageReducer.js';

export default combineReducers({
  users: users,
  routing: routerReducer,
  messages: messageReducer
});
