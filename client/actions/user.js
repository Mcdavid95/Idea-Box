import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as types from '../app/constants';
import history from '../utils/history';
import setAuthToken from '../utils/setAuthToken';

export const setCurrentUser = user => ({
  type: types.SET_CURRENT_USER,
  user
});

const signupUserSuccess = user => ({ type: types.SIGN_UP_USER_SUCCESS, user });

const signupUserFail = user => ({ type: types.SIGNUP_USER_ERROR, user });

/**
 * @function userSignupRequest
 * @param { object } userData
 * @returns {object} dispatches an action
 * @description It makes an api call to register a new user
 */
export const userSignupRequest = userData => dispatch => axios.post('/api/v1/user/signup', userData)
  .then((response) => {
    dispatch(signupUserSuccess(response));
    const { token } = response.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
    Materialize.toast(response.data.message, 3000, 'rounded green');
    history.push('/ideas');
  }).catch((err) => {
    dispatch(signupUserFail(err));
    Materialize.toast(err.response.data.error, 3000, 'rounded red');
  });

const userLoginSuccess = user => ({ type: types.LOGIN_USER_SUCCESS, user });

const userLoginFailed = user => ({ type: types.LOGIN_USER_ERROR, user });

/**
   * @function userLoginRequest
   * @param { object } userData
   * @returns {object} dispatches an action
   * @description It makes an api call to log i a registered user
   */
export const userLoginRequest = userData => dispatch => axios.post('/api/v1/user/signin', userData)
  .then((response) => {
    dispatch(userLoginSuccess(response));
    const { token } = response.data;
    console.log(token);
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
    Materialize.toast(response.data.message, 3000, 'rounded green');
    history.push('/ideas');
  })
  .catch((err) => {
    dispatch(userLoginFailed(err));
    Materialize.toast(err.response.data.error, 3000, 'rounded red');
  });

