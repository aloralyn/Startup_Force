import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import users from './usersReducer.js';

export default combineReducers({
  users: users,
  routing: routerReducer
});
