import * as types from '../app/constants';
import initialState from '../app/initialState';

const userDetails = (state = initialState.userDetails, action = {}) => {
  switch (action.type) {
    case types.GET_USERDETAILS_SUCCESS:
      return Object.assign(...state, action.details);

    case types.GET_USERDETAILS_ERROR:
      return [];

    default:
      return state;
  }
};

export default userDetails;
