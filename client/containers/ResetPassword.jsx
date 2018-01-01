import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import initialState from '../app/initialState';
import { confirmPasswordReset } from '../actions';
/**
 * @class
 */
export class ResetPassword extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = initialState.resetPassword;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showPassword = this.showPassword.bind(this);
  }
  /**
   *
   * @param {Event} event
   * @return {*} updates state for any change
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   * @param {*} event
   * @return {action} dispatches an action
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.confirmPasswordReset(this.props.match.params.token, this.state);
  }
  /**
   * @method showPassword
   * @returns {*} void
   */
  showPassword() {
    const element = document.getElementById(this.state.class || 'reset-password');
    if (element.type === 'password') {
      element.type = 'text';
    } else {
      element.type = 'password';
    }
  }
  /**
   * @return {DOM} DOM
   */
  render() {
    return (
      <div className="black-text idea-page">
        <div className="landing-page">
          <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">Logo</a>
            </div>
          </nav>
        </div>
        <div className="forgot-password container">
          <div className="password-body">
            <div>
              <h5
                id="forgot-password"
                className="center-align"
              >Type in new Password to Access your account
              </h5>
            </div>
            <form className="col s12" onSubmit={this.onSubmit}>
              <div className="row">
                <div className="input-field reset">
                  <input
                    className="form-control"
                    type="password"
                    id="reset"
                    name="newPassword"
                    required
                    value={this.state.newPassword}
                    onChange={this.onChange}
                  />
                  <label htmlFor="email" className="control-label">New Password</label>
                </div>

                <div className="input-field">
                  <input
                    className="form-control reset"
                    type="password"
                    name="confirmPassword"
                    required
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                  <label htmlFor="email" className="control-label">Confirm Password</label>
                </div>
                <p>
                  <input type="checkbox" onClick={() => this.showPassword()} id="check" />
                  <label htmlFor="check">Show Password</label>
                </p>
              </div>
              <button type="submit" className="form-control btn landing-buttons">Send</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  confirmPasswordReset: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default connect(null, { confirmPasswordReset })(ResetPassword);
