import * as types from '../app/constants';
import initialState from '../app/initialState';

const resetPasswordReducer = (state = initialState.forgotPassword, action = {}) => {
  switch (action.type) {
    case types.RESET_PASSWORD_SUCCESS:
      return [
        ...state, action.password
      ];

    case types.RESET_PASSWORD_FAILED:
      return [
      ];

    default:
      return state;
  }
};
export default resetPasswordReducer;
