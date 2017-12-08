import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createIdeaRequest } from '../actions/idea';
import initialState from '../app/initialState';
import Header from '../components/Header/Header';
import CreateIdea from '../containers/CreateIdea';
import SideNav from '../containers/SideNav';
/**
 * @class
 */
class IdeasPage extends Component {
  /**
   * @constructor
   * @description Creates Instance of Message
   * @memberOf Message
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.groupMessages,
      postMessage: initialState.postMessage,
      match: this.props.match,
      users: this.props.allUsers
    };
  }
  /**
   *
   * @return {*} loads actions when page loads initially
   */
  componentDidMount() {
    $('select').material_select();
    $('.collapsible').collapsible();
    $('.modal').modal();
    $('.tooltipped').tooltip({ delay: 50 });
  }
  /**
   *
   * @param {*} nextProps
   * @return {*} update state
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      match: nextProps.match
    });
  }


  /**
   * @return {Object} Returns DOM element
   */
  render() {
    return (
      <div className="white-text idea-page">
        <Header />
        <SideNav />
        <main className="container">
          <div id="modal1" className="modal  modal-fixed-footer">
            <div className="modal-content">
              <h3 className="idea-form heading">Create New Idea</h3>

              <CreateIdea createIdeaRequest={this.props.createIdeaRequest} />
            </div>
            <div className="modal-footer">
              <a
                href="#!"
                className="modal-action modal-close waves-effect waves-green btn-flat "
              >Close
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Card Title</span>
                  <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.
                  </p>
                </div>
                <div className="card-action">
                  <a href="#">This is a link</a>
                  <a href="#">This is a link</a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

IdeasPage.propTypes = {
  createIdeaRequest: PropTypes.func.isRequired,

};
export default connect(null, { createIdeaRequest })(IdeasPage);
