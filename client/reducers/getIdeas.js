import * as types from '../app/constants';
import initialState from '../app/initialState';

const getIdeas = (state = initialState.idea, action = {}) => {
  switch (action.type) {
    case types.GET_IDEAS_SUCCESS:
      return [
        ...state, action.ideas
      ];

    case types.GET_IDEAS_ERROR:
      return [];

    default:
      return state;
  }
};

export default getIdeas;
