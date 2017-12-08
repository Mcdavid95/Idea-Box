import axios from 'axios';
import * as types from '../app/constants';

const createIdeaSuccess = idea => ({ type: types.CREATE_IDEA_SUCCESS, idea });

const createIdeaFailed = idea => ({ type: types.CREATE_IDEA_FAILED, idea });

/**
   * @function createIdeaRequest
   * @param { object } ideaInfo
   * @returns {object} dispatches an action
   * @description It makes an api call to log i a registered user
   */
export const createIdeaRequest = ideaInfo => dispatch => axios.post('/api/v1/idea', ideaInfo)
  .then((response) => {
    dispatch(createIdeaSuccess(response));
    Materialize.toast(response.data.message, 3000, 'rounded green');
  })
  .catch((error) => {
    dispatch(createIdeaFailed(error));
    Materialize.toast(error.response.data.message, 3000, 'rounded red');
  });
