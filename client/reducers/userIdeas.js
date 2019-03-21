import * as types from '../app/constants';
import initialState from '../app/initialState';

const userIdeas = (state = initialState.userIdeas, action = {}) => {
  switch (action.type) {
    case types.GET_USER_IDEAS_SUCCESS:
      return [
        ...state, action.ideas
      ];

    case types.GET_USER_IDEAS_ERROR:
      return [];

    default:
      return state;
  }
};

export default userIdeas;
