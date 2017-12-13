import React from 'react';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import Signup from '../containers/Signup';
import Login from '../containers/Login';
import AuthenticateUser from '../utils/AuthenticateUser';
import CheckLoggedinUser from '../utils/CheckLoggedinUser';
import LandingPage from '../components/LandingPage';
import IdeasPage from '../containers/IdeasPage';
import IdeaPage from '../containers/CommentPage';
import CategoryPage from '../containers/CategoryPage';
import UserIdeaPage from '../containers/UserIdeaPage';
import EditIdeaPage from '../containers/EditIdeaPage';
import UpdateProfilePage from '../containers/UpdateProfilePage';

import '../public/styles/materialize.min.css';
import '../public/styles/app.scss';
import '../public/js/jquery-3.2.1.min';
import '../public/js/materialize.min';

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" name="landing" component={LandingPage} />
      <Route path="/register" name="signup" component={CheckLoggedinUser(Signup)} />
      <Route path="/login" name="login" component={CheckLoggedinUser(Login)} />
      <Route path="/ideas" name="ideasPage" component={AuthenticateUser(IdeasPage)} />
      <Route exact path="/idea/id/:id" name="ideaPage" component={AuthenticateUser(IdeaPage)} />
      <Route exact path="/idea/category/:category" name="category" component={AuthenticateUser(CategoryPage)} />
      <Route exact path="/my-ideas" name="myIdea" component={AuthenticateUser(UserIdeaPage)} />
      <Route exact path="/idea/edit/:id" name="myIdea" component={AuthenticateUser(EditIdeaPage)} />
      <Route exact path="/profile/edit/" name="myIdea" component={AuthenticateUser(UpdateProfilePage)} />
    </Switch>
  </Router>
);
export default App;

