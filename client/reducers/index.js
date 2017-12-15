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
import comment from './comment';
import getComments from './getComments';
import userDetails from './userDetails';
import forgotPassword from './forgotPassword';
import resetPassword from './resetPassword';
import deleteIdea from './deleteIdea';
import search from './search';

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
  updateIdea,
  comment,
  getComments,
  userDetails,
  forgotPassword,
  resetPassword,
  deleteIdea,
  search
});

export default rootReducer;
