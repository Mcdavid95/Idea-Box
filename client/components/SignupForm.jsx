import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Router } from 'react-router-dom';
import initialState from '../app/initialState';
import history from '../utils/history';


/**
 * @class SignupForm
 */
export default class SignupForm extends Component {
  /**
   * @constructor
   * @param {State} props
   */
  constructor(props) {
    super(props);
    this.state = initialState.signup;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   *
   * @param {Event} event
   * @return {state} sets state of button
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   * @param {Event} event
   * @return {state} updates state
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.userSignupRequest(this.state);
  }
  /**
   * @return {Object} Returns DOM element
   */
  render() {
    return (
      <div className="container white-text">
        <div className="row">
          <h3 className="heading">Join <span className="brand">Idea-Box</span> Today</h3>
          <form className="col s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <label htmlFor="email" className="control-label">Email</label>
              </div>

              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="username"
                  id="username"
                  type="text"
                  required
                  value={this.state.username}
                  onChange={this.onChange}
                />
                <label htmlFor="username" className="control-label">User Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="fullname"
                  id="fullname"
                  type="text"
                  placeholder="Fulll Name"
                  min="10"
                  required
                  value={this.state.fullname}
                  onChange={this.onChange}
                />
                <label htmlFor="fullname" className="control-label">Full Name:</label>
              </div>
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="password"
                  id="password"
                  type="password"
                  pattern=".{5,10}"
                  required
                  title="Password must be between 5 and 10 characters"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <label htmlFor="password" className="control-label">Password:</label>
              </div>
            </div>
            <div className="row">
              <button type="submit" className="btn landing-buttons" href="#">Submit</button>
              <p
                className="col s12 m6"
                id="signin"
              >
                Already have an account?
                <Router history={history}>
                  <Link to="/login">
                Login
                  </Link>
                </Router> to continue with the app
              </p>
            </div>
          </form>
          <h5>There is one thing stronger than all the armies in the world, and that is an idea whose time has come.”– Victor Hugo</h5>
        </div>
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};
