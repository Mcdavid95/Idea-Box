import * as types from '../app/constants';

const deleteIdea = (state = {}, action) => {
  switch (action.type) {
    case types.DELETE_IDEA_SUCCESS:
      return Object.assign(...state, action.idea);

    case types.DELETE_IDEA_ERROR:
      return [];

    default:
      return state;
  }
};

export default deleteIdea;
