import * as types from '../app/constants';
import initialState from '../app/initialState';

const signup = (state = initialState.signup, action) => {
  switch (action.type) {
    case types.SIGN_UP_USER_SUCCESS:
      return [
        ...state, action
      ];

    case types.SIGNUP_USER_ERROR:
      return [];
    default:
      return state;
  }
};

export default signup;
