import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import initialState from '../app/initialState';
import { forgotPassword } from '../actions';
/**
 * @class
 */
export class ForgotPasswordPage extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = initialState.forgotPassword;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   *
   * @param {Event} e
   * @return {*} updates state for any change
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  /**
   *
   * @param {*} e
   * @return {action} dispatches an action
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.forgotPassword(this.state);
  }
  /**
   * @return {DOM} DOM
   */
  render() {
    return (
      <div className="black-text idea-page ">
        <div className="landing-page">
          <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo" id="brand-logo">Idea-Box</a>
            </div>
          </nav>
        </div>
        <div className="forgot-password container">
          <div className="password-body">
            <div>
              <h5
                id="forgot-password"
                className="center-align"
              >Input the email address associated with your account
              </h5>
              <p className="center">You will receive an email with a password reset link </p>
            </div>
            <form className="col s12 form" onSubmit={this.onSubmit}>
              <div className="row">
                <div className="input-field col s8">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <label htmlFor="email" className="control-label">Email</label>
                </div>
                <button type="submit" className="form-control landing-buttons btn btn-primary">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  forgotPassword: PropTypes.func.isRequired
};

export default connect(null, { forgotPassword })(ForgotPasswordPage);
