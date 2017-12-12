import * as types from '../app/constants';
import initialState from '../app/initialState';

const updateIdea = (state = initialState.editIdea, action) => {
  switch (action.type) {
    case types.UPDATE_IDEA_SUCCESS:
      return Object.assign(action.idea, state);

    case types.UPDATE_IDEA_ERROR:
      return [];

    default:
      return state;
  }
};

export default updateIdea;
