import * as types from '../app/constants';
import initialState from '../app/initialState';

const search = (state = initialState.search, action) => {
  switch (action.type) {
    case types.SEARCH_SUCCESS:
      return [
        ...state, action
      ];

    case types.SEARCH_ERROR:
      return [];

    default:
      return state;
  }
};

export default search;
