import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compiler } from 'markdown-to-jsx';
import shortId from 'shortid';
import Header from '../components/Header/Header';
import SideNav from './SideNav';
import CreateIdea from '../components/CreateIdea';
import CommentForm from '../components/CommentForm';
import DisplayComments from './DisplayComments';
import { getOneIdea, createIdeaRequest, sendComment, getComments } from '../actions';

/**
 * @class
 */
export class CommentPage extends Component {
/**
 * Create Inatance of class CommentPage
 * @constructor
 * @param {*}props any
 */
  constructor(props) {
    super(props);
    this.state = {
      getIdea: this.props.getIdea
    };
  }
  /**
   * @method
   * @returns {*} makes call for action
   */
  componentDidMount() {
    this.props.getOneIdea(this.props.match.params.id);
    $('.collapsible').collapsible();
    $('.modal').modal();
    $('.tooltipped').tooltip({ delay: 50 });
  }
  /**
   * @method
   * @memberOf Class CommentPage
   * @param {*} nextProps updated props
   * @return {*} sets state to currrent prop
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      getIdea: nextProps.getIdea
    });
  }
  /**
  * @method
  * @memberOf Class CommentPage
  * @return {object}DOM  OBJECT
  */
  render() {
    return (
      <div className="idea-page">
        <Header />
        <SideNav />
        <main>
          <div id="modal1" className="modal  modal-fixed-footer">
            <div className="modal-content">
              <h3 className="idea-form heading">Create New Idea</h3>
              <CreateIdea
                createIdeaRequest={this.props.createIdeaRequest}
              />
            </div>
            <div className="modal-footer">
              <a
                href="#!"
                className="modal-action modal-close waves-effect waves-green btn-flat "
              >Close
              </a>
            </div>
          </div>
          <div className="">
            <ul>
              {this.state.getIdea.map(idea => (
                <li key={shortId.generate()}>
                  <div className="card sticky-action medium container white ">
                    <div className="card-content">
                      <span><h4>{idea.title}</h4></span>
                      <hr />
                      <div>{typeof idea.description === 'string' ? compiler(idea.description) : ''}</div>
                    </div>
                  </div>
                </li>
          ))}
            </ul>
          </div>
          <div className="row">
            <span className="col s4 m4 l4 center"><h5>Comments</h5></span>
          </div>
          <DisplayComments id={this.props.match.params.id} />
          <CommentForm
            getComments={this.props.getComments}
            id={this.props.match.params.id}
            sendComment={this.props.sendComment}
          />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getIdea: state.getIdea
});

CommentPage.propTypes = {
  getOneIdea: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  getIdea: PropTypes.array.isRequired,
  sendComment: PropTypes.func.isRequired,
  createIdeaRequest: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  getOneIdea, createIdeaRequest, sendComment, getComments
})(CommentPage);
