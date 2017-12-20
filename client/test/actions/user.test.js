import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import initialState from '../../app/initialState';
import mockLocalStorage from '../__mocks__/mockLocalStorage';
import * as actions from '../../actions/user';
import * as types from '../../app/constants';
import { token, userDetails, userSigninData, invalidUserSigninData, payLoad } from '../__mocks__/actions.mocks';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;

describe('Signup action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('contains a sign up action', () => {
    expect(typeof (actions.userSignupRequest())).toBe('function');
  });

  it('should dispatch SET_CURRENT_USER on successful sign up', (done) => {
    moxios.stubRequest('/api/v1/user/signup', {
      status: 201,
      response: {
        data: {
          message: `Welcome to Idea-Box!! ${userDetails.username}`,
          token
        }
      }
    });
    const expectedActions = [
      { type: types.SET_CURRENT_USER }
    ];
    store.dispatch(actions.userSignupRequest(userDetails)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });


  it('should dispatch SIGNUP_USER_ERROR on successful sign up', (done) => {
    moxios.stubRequest('/api/v1/user/signup', {
      status: 409,
      response: {
        data: {
          error: 'user with that email already exist',
        }
      }
    });
    const expectedActions = [
      { type: types.SIGNUP_USER_ERROR }
    ];
    store.dispatch(actions.userSignupRequest(userDetails)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Sign in action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('contains a userLoginRequest function', () => {
    expect(typeof (actions.userLoginRequest())).toBe('function');
  });

  it('should dispatch LOGIN_USER_SUCCESS on successful sign in', (done) => {
    moxios.stubRequest('/api/v1/user/signin', {
      status: 201,
      response: {
        data: {
          message: `Welcome back ${userSigninData.username}`,
          token
        }
      }
    });
    const expectedActions = [
      { type: types.LOGIN_USER_SUCCESS }
    ];
    store.dispatch(actions.userLoginRequest(userSigninData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch LOGIN_USER_ERROR on successful sign up', (done) => {
    moxios.stubRequest('/api/v1/user/login', {
      status: 401,
      response: {
        data: {
          error: 'Incorrect password',
        }
      }
    });
    const expectedActions = [
      { type: types.LOGIN_USER_ERROR }
    ];
    store.dispatch(actions.userSignupRequest(invalidUserSigninData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Logout Action', () => {
  beforeEach(() => {
    moxios.install();
    mockLocalStorage.setItem('jwtToken', token);
    mockLocalStorage.getItem('jwtToken');
  });
  afterEach(() => {
    moxios.uninstall();
    mockLocalStorage.removeItem('jwtToken');
  });
  const store = mockStore(initialState);

  it('contains a logout function', () => {
    expect(typeof (actions.logout())).toBe('function');
  });

  it('should dispatch LOGOUT_USER on successful logout', (done) => {
    const expectedActions =
    [{ type: 'SET_CURRENT_USER', user: {} }, { type: 'LOGOUT_USER', user: undefined }];
    store.dispatch(actions.logout());
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});

describe('Get userDetails actions', () => {
  beforeEach(() => {
    moxios.install();
    mockLocalStorage.setItem('jwtToken', token);
    mockLocalStorage.getItem('jwtToken');
  });
  afterEach(() => {
    moxios.uninstall();
    mockLocalStorage.removeItem('jwtToken');
  });

  const store = mockStore(initialState);

  it('should dispatch GET_USERDETAILS_SUCCESS if successful', (done) => {
    moxios.stubRequest('/api/v1/user/info', {
      status: 200,
      response: {
        data: {
          user: {
            userDetails
          }
        }
      }
    });
    const expectedActions = [
      { type: types.GET_USERDETAILS_SUCCESS }
    ];
    store.dispatch(actions.getUserDetails()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch GET_USERDETAILS_SUCCESS if successful', (done) => {
    moxios.stubRequest('/api/v1/user/info', {
      status: 400,
      response: {
        data: {
          error: {
            message: 'could not fetch messages'
          }
        }
      }
    });
    const expectedActions = [
      { type: types.GET_USERDETAILS_ERROR }
    ];
    store.dispatch(actions.getUserDetails()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Update userDetails actions', () => {
  beforeEach(() => {
    moxios.install();
    mockLocalStorage.setItem('jwtToken', token);
    mockLocalStorage.getItem('jwtToken');
  });
  afterEach(() => {
    moxios.uninstall();
    mockLocalStorage.removeItem('jwtToken');
  });

  const store = mockStore(initialState);

  it('should dispatch GET_USERDETAILS_SUCCESS if successful', (done) => {
    moxios.stubRequest('/api/v1/user/update', {
      status: 202,
      response: {
        data: {
          message: 'Details successfully updated',
          updatedDetails: {
            userDetails
          }
        }
      }
    });
    const expectedActions = [
      { type: types.UPDATE_USERDETAILS_SUCCESS }
    ];
    store.dispatch(actions.updateUserDetails(userDetails)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch UPDATE_USERDETAILS_ERROR if successful', (done) => {
    moxios.stubRequest('/api/v1/user/update', {
      status: 409,
      response: {
        data: {
          error: 'user with that email already exist'
        }
      }
    });
    const expectedActions = [
      { type: types.UPDATE_USERDETAILS_ERROR }
    ];
    store.dispatch(actions.updateUserDetails(userDetails)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Forgot password action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('contains a forgotPassword function', () => {
    expect(typeof (actions.forgotPassword())).toBe('function');
  });

  it('should dispatch CONFIRM_EMAIL_SUCCESS', (done) => {
    moxios.stubRequest('/api/v1/user/reset', {
      status: 202,
      response: {
        data: {
          message: 'A link has has been sent to your mail',
          passwordToken: payLoad.passwordToken
        }
      }
    });
    const expectedActions = [
      { type: types.CONFIRM_EMAIL_SUCCESS }
    ];
    store.dispatch(actions.forgotPassword(payLoad.email)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch CONFIRM_EMAIL_FAILED if an error occurs', (done) => {
    moxios.stubRequest('/api/v1/reset/', {
      status: 404,
      response: {
        data: {
          error: 'Account associated with this email not found'
        }
      }
    });
    const expectedActions = [
      { type: types.CONFIRM_EMAIL_FAILED }
    ];
    store.dispatch(actions.forgotPassword(payLoad.email)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});


describe('confirm Password reset', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('contains a forgotPassword function', () => {
    expect(typeof (actions.confirmPasswordReset())).toBe('function');
  });

  it('should dispatch RESET_PASSWORD_SUCCESS', (done) => {
    moxios.stubRequest(`/api/v1/reset/${payLoad.token}`, payLoad, {
      status: 201,
      response: {
        data: {
          message: 'Password has been updated',
          userDetails
        }
      }
    });
    const expectedActions = [
      { type: types.RESET_PASSWORD_SUCCESS }
    ];
    store.dispatch(actions.confirmPasswordReset(payLoad.token, payLoad)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch RESET_PASSWORD_FAILED if an error occurs', (done) => {
    moxios.stubRequest(`/api/v1/reset-password/${payLoad.token}`, payLoad, {
      status: 410,
      response: {
        data: {
          success: false,
          message: 'Expired link'
        }
      }
    });
    const expectedActions = [
      { type: types.RESET_PASSWORD_FAILED }
    ];
    store.dispatch(actions.confirmPasswordReset(payLoad.token, payLoad)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
