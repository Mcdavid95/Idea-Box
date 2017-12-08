import * as types from '../app/constants';
import initialState from '../app/initialState';

const createIdea = (state = initialState.idea, action = {}) => {
  switch (action.type) {
    case types.CREATE_IDEA_SUCCESS:
      return [
        ...state, action
      ];

    case types.CREATE_IDEA_FAILED:
      return [];

    default:
      return state;
  }
};

export default createIdea;
