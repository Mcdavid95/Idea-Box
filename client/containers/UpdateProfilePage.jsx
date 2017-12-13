import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';
import SideNav from './SideNav';
import { getUserDetails, updateUserDetails } from '../actions';
/**
 * @class UpdateProfilePage
 * @extends React.Component
 */
export class UpdateProfilePage extends Component {
  /**
   * Creates Instance of UpdateProfilePage
   * @param {Object} props
   * @memberOf UpdateProfilePage
   */
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.userDetails.username,
      email: this.props.userDetails.email,
      fullname: this.props.userDetails.fullname,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   *
   * @return {*} loads actions when page loads initially
   */
  componentDidMount() {
    this.props.getUserDetails();
    $('.collapsible').collapsible();
    $('.modal').modal();
    $('.tooltipped').tooltip({ delay: 50 });
  }
  /**
 *
 * @param {*} nextProps updated props
 * @returns {DOM} DOM object
 */
  componentWillReceiveProps(nextProps) {
    this.setState({
      username: nextProps.userDetails.username,
      email: nextProps.userDetails.email,
      fullname: nextProps.userDetails.fullname,
    });
  }
  /**
   *
   * @param {Event} event
   * @return {Object} updates State
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @description makes API call to create group
   * @param {Event} event
   * @return {state} updates state
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.updateUserDetails(this.state);
  }

  /**
   * @return {DOM} DOM Object
   */
  render() {
    return (
      <div className="white-text idea-page">
        <Header />
        <SideNav />
        <main>
          <div className="container white">
            <form id="edit" onSubmit={this.onSubmit} className="idea-form">
              <div className="input-field">
                <label htmlFor="fullname" className="control-label">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  className="form-control"
                  value={this.state.fullname}
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="input-field">
                <label htmlFor="username" className="control-label">User Name</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={this.state.username}
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="input-field">
                <label htmlFor="email" className="control-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={this.state.email}
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="input-field">
                <label htmlFor="submit" className="control-label" />
                <button
                  type="submit"
                  className="btn waves-effect waves-light landing-buttons modal-action"
                >Submit
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userDetails: state.userDetails
});

UpdateProfilePage.propTypes = {
  getUserDetails: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  updateUserDetails: PropTypes.func.isRequired
};


export default connect(mapStateToProps, { getUserDetails, updateUserDetails })(UpdateProfilePage);
