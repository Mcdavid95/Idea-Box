import * as types from '../app/constants';
import initialState from '../app/initialState';

const editIdea = (state = initialState.editIdea, action) => {
  switch (action.type) {
    case types.EDIT_IDEA_SUCCESS:
      return Object.assign(action.idea, state);

    case types.EDIT_IDEA_ERROR:
      return [];

    default:
      return state;
  }
};

export default editIdea;
