import { combineReducers } from 'redux';

// reducers
import auth from './modules/auth';
import states from './modules/states';
import flights from './modules/flights';

const appReducer = combineReducers({
  auth,
  states,
  flights
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;