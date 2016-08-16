import { combineReducers } from 'redux';

import auth from './auth';

export default (state, action) => {
  console.log('state', state, 'action', action);
  return state
}
// export default combineReducers({
//   auth,
// });
