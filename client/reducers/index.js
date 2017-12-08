import { combineReducers } from 'redux';
import signup from './signup';
import login from './login';
import idea from './idea';

const rootReducer = combineReducers({
  signup,
  login,
  idea
});

export default rootReducer;
