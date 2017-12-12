import isEmpty from 'lodash/isEmpty';
import initialState from '../app/initialState';
import * as types from '../app/constants';

const setCurrentUser = (state = initialState.setCurrentUser, action = {}) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    default: return state;
  }
};
export default setCurrentUser;
