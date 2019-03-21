import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore, compose } from 'redux';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser } from '../actions';
import App from './App';
import rootReducer from '../reducers';
import initialState from './initialState';

const logger = createLogger();
const middleware = applyMiddleware(logger, thunk);

const configureStore = (state = initialState) => createStore(
  rootReducer,
  state,
  compose(middleware, window.devToolsExtension ? window.devToolsExtension() : f => f)
);

const store = configureStore();
const app = document.getElementById('root');


if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
} else {
  setAuthToken(false);
  store.dispatch(setCurrentUser({}));
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  app
);

