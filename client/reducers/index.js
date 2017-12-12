import { combineReducers } from 'redux';
import signup from './signup';
import login from './login';
import idea from './idea';
import getIdeas from './getIdeas';
import setCurrentUser from './setCurrentUser';
import getIdea from './getIdea';
import getCategory from './getCategory';
import userIdeas from './userIdeas';
import editIdea from './editIdea';
import updateIdea from './updateIdea'; 

const rootReducer = combineReducers({
  signup,
  login,
  idea,
  getIdeas,
  setCurrentUser,
  getIdea,
  getCategory,
  userIdeas,
  editIdea,
  updateIdea
});

export default rootReducer;
