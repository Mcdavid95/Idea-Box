import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Signup from '../containers/Signup';
import Login from '../containers/Login';
import LandingPage from '../components/LandingPage';
import IdeasPage from '../components/IdeasPage';

import '../public/styles/materialize.min.css';
import '../public/styles/app.scss';
import '../public/js/jquery-3.2.1.min';
import '../public/js/materialize.min';

const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" name="landing" component={LandingPage} />
      <Route exact path="/register" name="signup" component={Signup} />
      <Route exact path="/login" name="login" component={Login} />
      <Route exact path="/ideas" name="ideas" component={IdeasPage} />
    </Switch>
  </Router>
);
export default App;

