import * as types from '../app/constants';
import initialState from '../app/initialState';

const loginReducer = (state = initialState.login, action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return [
        ...state, action
      ];

    case types.LOGIN_USER_ERROR:
      return [];

    default:
      return state;
  }
};

export default loginReducer;
