import * as types from '../app/constants';
import initialState from '../app/initialState';

const getIdea = (state = initialState.getIdea, action = {}) => {
  switch (action.type) {
    case types.GET_IDEA_SUCCESS:
      return [
        action.idea
      ];

    case types.GET_IDEAS_ERROR:
      return [];

    default:
      return state;
  }
};

export default getIdea;
