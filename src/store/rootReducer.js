import { combineReducers } from 'redux';

// reducers
import auth from './modules/auth';

const appReducer = combineReducers({
  auth
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;