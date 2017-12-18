import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Header from '../components/Header/Header';
import LoginForm from '../components/LoginForm';
import { userLoginRequest } from '../actions';
// import Footer from '../../containers/Footer';

/**
 * @method Login
 * @param {*} props
 * @returns {DOM} DOM Element
 * @description renders the login page
 */
const Login = props => (
  <div>
    <div className="container white-text">
      <div className="heading center">
        <h4>Welcome to <span className="brand" id="top">Idea-Box</span></h4>
        <p>
        Behind this mask there is
         more than just flesh. Beneath this mask there is an idea... and ideas are bulletproof.
        ― Alan Moore, V for Vendetta
        </p>
      </div>
      <LoginForm userLoginRequest={props.userLoginRequest} />
    </div>
  </div>
);

Login.propTypes = {
  userLoginRequest: PropTypes.func.isRequired
};


export default connect(null, {
  userLoginRequest
})(Login);
