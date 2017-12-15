import React from 'react';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import Signup from '../containers/Signup';
import Login from '../containers/Login';
import AuthenticateUser from '../utils/AuthenticateUser';
import CheckLoggedinUser from '../utils/CheckLoggedinUser';
import IdeasPage from '../containers/IdeasPage';
import IdeaPage from '../containers/CommentPage';
import CategoryPage from '../containers/CategoryPage';
import UserIdeaPage from '../containers/UserIdeaPage';
import EditIdeaPage from '../containers/EditIdeaPage';
import UpdateProfilePage from '../containers/UpdateProfilePage';
import ForgotPassword from '../containers/ForgotPassword';
import ResetPassword from '../containers/ResetPassword';
import Search from '../containers/Search';

import '../public/styles/materialize.min.css';
import '../public/styles/app.scss';
import '../public/js/jquery-3.2.1.min';
import '../public/js/materialize.min';

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" name="landing" component={CheckLoggedinUser(Login)} />
      <Route path="/register" name="signup" component={CheckLoggedinUser(Signup)} />
      <Route path="/login" name="login" component={CheckLoggedinUser(Login)} />
      <Route exact path="/ideas" name="ideasPage" component={AuthenticateUser(IdeasPage)} />
      <Route
        exact
        path="/idea/id/:id"
        name="ideaPage"
        component={AuthenticateUser(IdeaPage)}
      />
      <Route
        exact
        path="/idea/category/:category"
        name="category"
        component={AuthenticateUser(CategoryPage)}
      />
      <Route
        exact
        path="/my-ideas"
        name="myIdea"
        component={AuthenticateUser(UserIdeaPage)}
      />
      <Route
        exact
        path="/idea/edit/:id"
        name="edit"
        component={AuthenticateUser(EditIdeaPage)}
      />
      <Route
        exact
        path="/profile/edit/"
        name="profile"
        component={AuthenticateUser(UpdateProfilePage)}
      />
      <Route
        exact
        path="/forgot-password"
        name="password"
        component={AuthenticateUser(ForgotPassword)}
      />
      <Route
        exact
        path="/reset/:token"
        name="password"
        component={AuthenticateUser(ResetPassword)}
      />
      <Route exact path="/ideas/search" name="Search" component={AuthenticateUser(Search)} />
    </Switch>
  </Router>
);
export default App;

