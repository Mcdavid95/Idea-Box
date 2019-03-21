import * as types from '../app/constants';
import initialState from '../app/initialState';

const updateProfile = (state = initialState.userDetails, action) => {
  switch (action.type) {
    case types.UPDATE_USERDETAILS_SUCCESS:
      return [
        ...state, action
      ];

    case types.UPDATE_USERDETAILS_ERROR:
      return [];

    default:
      return state;
  }
};

export default updateProfile;
