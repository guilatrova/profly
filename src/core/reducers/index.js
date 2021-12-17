import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
});

export default rootReducer;
