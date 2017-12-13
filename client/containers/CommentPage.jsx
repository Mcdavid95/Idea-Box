import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import SideNav from './SideNav';
import CommentForm from '../components/CommentForm';
import DisplayComments from './DisplayComments';
import { getOneIdea, sendComment } from '../actions';

/**
 * @class
 */
class CommentPage extends Component {
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
          <ul className="collapsible center" id="one-idea" data-collapsible="accordion">
            {this.state.getIdea.map(idea => (
              <li key={idea._id}>
                <div className="collapsible-header">
                  <i className="material-icons">filter_drama</i>{idea.title}
                </div>
                <div className="collapsible-body"><span>{idea.description}</span></div>
              </li>
          ))}
          </ul>
          <div className="row">
            <hr className="col s4 m4 l4" />
            <span className="col s4 m4 l4 center"><h5>Comments</h5></span>
            <hr className="col s4 m4 l4" />
          </div>
          <DisplayComments id={this.props.match.params.id} />
          <CommentForm id={this.props.match.params.id} sendComment={this.props.sendComment} />
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
  sendComment: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getOneIdea, sendComment })(CommentPage);
