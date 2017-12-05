import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const App = () => (
  <Router history={history} />
);
export default App;

