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

const logoutSuccess = user => ({
  type: types.LOGOUT_USER,
  user
});

  /**
   * @function logout
   * @returns {object} dispatches an action
   * @description It logs out the user and deletes token from local storage
   */
export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch(logoutSuccess());
  history.push('/');
};

const userDetailsSuccess = details => ({ type: types.GET_USERDETAILS_SUCCESS, details });

const userDetailsFailed = details => ({ type: types.GET_USERDETAILS_ERROR, details });

/**
   * @function getUserDetails
   * @returns {object} dispatches an action
   * @description It logs out the user and deletes token from local storage
   */
export const getUserDetails = () => dispatch => axios.get('/api/v1/user/info')
  .then((response) => {
    dispatch(userDetailsSuccess(response.data.user));
  })
  .catch((response) => {
    dispatch(userDetailsFailed(response));
  });

const updateDetailsSuccess = details => ({ type: types.UPDATE_USERDETAILS_SUCCESS, details });

const updateDetailsFailed = details => ({ type: types.UPDATE_USERDETAILS_ERROR, details });

/**
     * @function updateUserDetails
     * @returns {object} dispatches an action
     * @description It logs out the user and deletes token from local storage
     * @param {object} userData form data
     */
export const updateUserDetails = userData => dispatch => axios.put('/api/v1/user/update', userData)
  .then((response) => {
    dispatch(updateDetailsSuccess(response));
    Materialize.toast(response.data.message, 3000, 'rounded green');
    history.push('/my-ideas');
  })
  .catch((response) => {
    dispatch(updateDetailsFailed(response));
    Materialize.toast(response.error, 3000, 'rounded red');
  });

const confirmEmailSuccess = email => ({
  type: types.CONFIRM_EMAIL_SUCCESS, email
});

const confirmEmailFailed = email => ({
  type: types.CONFIRM_EMAIL_FAILED, email
});

  /**
   * @function forgotPassword
   * @param { object } email
   * @returns {object} dispatches an action
   * @description It makes an api call to check if email is valid and send
   */
export const forgotPassword = email => dispatch =>
  axios.post('/api/v1/user/reset', email)
    .then((response) => {
      dispatch(confirmEmailSuccess(response));
      Materialize.toast('A Link has been sent to your mail to reset your email It expires after 30mins', 6000, 'rounded, green');
      history.push('/login');
    })
    .catch((err) => {
      dispatch(confirmEmailFailed(err));
      Materialize.toast(err.response.data.error, 3000, 'rounded red');
    });

const confirmPasswordResetSuccess = password => ({
  type: types.RESET_PASSWORD_SUCCESS, password
});

const confirmPasswordResetFailed = password => ({
  type: types.RESET_PASSWORD_FAILED, password
});

/**
 * @function confirmPasswordReset
 * @param { string } token
 * @param { object } newPassword
 * @returns {object} dispatches an action
 * @description It makes an api call to chang password and send comfirmatory email
 */
export const confirmPasswordReset = (token, newPassword) => dispatch =>
  axios.put(`/api/v1/user/reset/${token}`, newPassword)
    .then((response) => {
      dispatch(confirmPasswordResetSuccess(response));
      Materialize.toast('Password reset successful', 6000, 'rounded, green');
      history.push('/login');
    })
    .catch((err) => {
      dispatch(confirmPasswordResetFailed(err));
      Materialize.toast(err.response.data.message, 3000, 'rounded red');
    });

