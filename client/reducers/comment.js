import * as types from '../app/constants';
import initialState from '../app/initialState';

const comment = (state = initialState.comment, action) => {
  switch (action.type) {
    case types.CREATE_COMMENT_SUCCESS:
      return Object.assign(action.comment, state);

    case types.CREATE_COMMENT_ERROR:
      return [];
    default:
      return state;
  }
};

export default comment;
