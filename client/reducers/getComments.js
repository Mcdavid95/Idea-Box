import * as types from '../app/constants';
import initialState from '../app/initialState';

const getComments = (state = initialState.getComments, action = {}) => {
  switch (action.type) {
    case types.GET_COMMENTS_SUCCESS:
      return [
        ...state, action.comments
      ];

    case types.GET_COMMENTS_ERROR:
      return [];

    default:
      return state;
  }
};

export default getComments;
