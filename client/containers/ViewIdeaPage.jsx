import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import { compiler } from 'markdown-to-jsx';
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
        <div className="landing-page">
          <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo" id="brand-logo">Idea-Box</a>
            </div>
          </nav>
        </div>
        <main>
          <div className="">
            <ul>
              {this.state.getIdea.map(idea => (
                <li key={shortId.generate()}>
                  <div className="card sticky-action medium white">
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
        </main>
        <div className="container">
          <a href="/"><button className="btn landing-buttons">Go to App</button></a>
        </div>
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
  getIdea: PropTypes.array.isRequired
};

export default connect(mapStateToProps, {
  getOneIdea, createIdeaRequest, sendComment, getComments
})(CommentPage);
