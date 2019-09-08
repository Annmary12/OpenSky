import { combineReducers } from 'redux';

// reducers
import auth from './modules/auth';
import states from './modules/states';

const appReducer = combineReducers({
  auth,
  states
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;