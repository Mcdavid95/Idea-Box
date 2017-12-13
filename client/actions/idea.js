import axios from 'axios';
import * as types from '../app/constants';
import history from '../utils/history';

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

const getIdeasSuccess = ideas => ({ type: types.GET_IDEAS_SUCCESS, ideas });

const getIdeasFailed = ideas => ({ type: types.GET_IDEAS_ERROR, ideas });

export const getPublicIdeas = currentPage => dispatch => axios.get(`/api/v1/ideas?currentPage=${currentPage}`)
  .then((response) => {
    dispatch(getIdeasSuccess(response.data));
  })
  .catch((error) => {
    dispatch(getIdeasFailed(error));
    Materialize.toast('could not fetch ideas', 3000, 'rounded red');
  });

const getIdeaSuccess = idea => ({ type: types.GET_IDEA_SUCCESS, idea });

const getIdeaError = idea => ({ type: types.GET_IDEA_ERROR, idea });

export const getOneIdea = id => dispatch => axios.get(`/api/v1/idea?id=${id}`)
  .then((response) => {
    dispatch(getIdeaSuccess(response.data.idea));
  })
  .catch((error) => {
    dispatch(getIdeaError(error));
    Materialize.toast('could not fetch idea', 3000, 'rounded red');
  });

const getIByCategorySuccess = ideas => ({ type: types.GET_IDEAS_SUCCESS, ideas });

const getByCategoryFailed = ideas => ({ type: types.GET_IDEAS_ERROR, ideas });

export const getByCategory = (category, currentPage) => dispatch => axios.get(`/api/v1/ideas/category?category=${category}&currentPage=${currentPage}`)
  .then((response) => {
    dispatch(getIByCategorySuccess(response.data));
  })
  .catch((error) => {
    dispatch(getByCategoryFailed(error));
    Materialize.toast('could not fetch ideas', 3000, 'rounded red');
  });

const getUserIdeasSuccess = ideas => ({ type: types.GET_USER_IDEAS_SUCCESS, ideas });

const getUserIdeasFailed = ideas => ({ type: types.GET_USER_IDEAS_ERROR, ideas });

export const getUserIdeas = currentPage => dispatch => axios.get(`/api/v1/user/ideas?currentPage=${currentPage}`)
  .then((response) => {
    dispatch(getUserIdeasSuccess(response.data));
  })
  .catch((error) => {
    dispatch(getUserIdeasFailed(error));
    Materialize.toast('could not fetch ideas', 3000, 'rounded red');
  });
const editIdeasSuccess = idea => ({ type: types.EDIT_IDEA_SUCCESS, idea });

const editIdeasFailed = idea => ({ type: types.EDIT_IDEA_ERROR, idea });

export const editIdea = id => dispatch => axios.get(`/api/v1/idea/${id}`)
  .then((response) => {
    dispatch(editIdeasSuccess(response.data.idea));
  })
  .catch((error) => {
    dispatch(editIdeasFailed(error));
    Materialize.toast('could not fetch idea', 3000, 'rounded red');
  });

const updateIdeasSuccess = idea => ({ type: types.UPDATE_IDEA_SUCCESS, idea });

const updateIdeasFailed = idea => ({ type: types.UPDATE_IDEA_ERROR, idea });

export const updateIdea = (id, updatedIdea) => dispatch => axios.put(`/api/v1/idea?id=${id}`, updatedIdea)
  .then((response) => {
    dispatch(updateIdeasSuccess(response.data.updatedIdea));
    Materialize.toast(response.data.message, 3000, 'rounded green');
    history.push('/my-ideas');
  })
  .catch((error) => {
    dispatch(updateIdeasFailed(error));
    Materialize.toast('could not fetch idea', 3000, 'rounded red');
  });


const commentSuccess = comment => ({ type: types.CREATE_COMMENT_SUCCESS, comment });

const commentFailed = comment => ({ type: types.CREATE_COMMENT_ERROR, comment });

export const sendComment = (commentData, id) => dispatch => axios.post(`/api/v1/idea/${id}/comment`, commentData)
  .then((response) => {
    dispatch(commentSuccess(response.data.newComment));
    Materialize.toast(response.data.message, 3000, 'rounded green');
  })
  .catch((response) => {
    dispatch(commentFailed(response));
    Materialize.toast(response.data.message, 3000, 'rounded red');
  });

const getCommentsSuccess = comments => ({ type: types.GET_COMMENTS_SUCCESS, comments });

const getCommentsFailed = comments => ({ type: types.GET_COMMENTS_ERROR, comments });

export const getComments = id => dispatch => axios.get(`/api/v1/idea/${id}/comment`)
  .then((response) => {
    dispatch(getCommentsSuccess(response.data.comments));
  })
  .catch((response) => {
    dispatch(getCommentsFailed(response));
    Materialize.toast(response.data.message, 3000, 'rounded red');
  });
