import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import initialState from '../app/initialState';
import { getComments } from '../actions';

/**
 * @class DisplayComments
 */
export class DisplayComments extends Component {
  /**
   * Creates Instance of .class DisplayName
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      comments: initialState.getComments
    };
  }
  /**
   *
   * @memberOf Class DisplayComments
   * @method componentDidMount
   * @returns {*} makes call to the actions
   */
  componentDidMount() {
    this.props.getComments(this.props.id);
  }
  /**
 * @memberOf Class DisplayComments
 * @method componentWillReceiveProps
 * @param {*} nextProps
 * @returns {*}updates state with new props
 */
  componentWillReceiveProps(nextProps) {
    this.setState({
      comments: nextProps.comments[nextProps.comments.length - 1]
    });
  }
  /**
 * @method render
 * @memberOf Class DisplayComments
 * @returns {*} DOM Object
 */
  render() {
    return (
      <div className="show-comments">
        {this.state.comments.map(comment => (
          <div className="comment-bubbles" key={comment._id}>
            <div className="comment-header">
              <span className="comment-profile-name">
                <i className="material-icons prefix">assignment_ind</i>
                <h5>{comment.author.username}</h5>
              </span>
              <span className="right">{ moment(comment.createdAt).startOf().fromNow() }</span>
            </div>
            <div className="content"><span>{comment.content}</span></div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.getComments
});

DisplayComments.propTypes = {
  getComments: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired
};

export default connect(mapStateToProps, { getComments })(DisplayComments);
