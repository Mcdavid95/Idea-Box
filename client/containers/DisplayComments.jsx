import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import initialState from '../app/initialState';
import { getComments } from '../actions';

/**
 * @class DisplayComments
 */
class DisplayComments extends Component {
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
      comments: nextProps.comments[0]
    });
  }
  /**
 * @method render
 * @memberOf Class DisplayComments
 * @returns {*} DOM Object
 */
  render() {
    return (
      <div className="show-comments row">
        {this.state.comments.map(comment => (
          <div className="col s12 m12">
            <div className="card-panel white">
              <div><span><strong>{comment.author.username}</strong></span><span className="right">{ moment(comment.createdAt).startOf().fromNow() }</span></div>
              <hr />
              <div className="content"><span>{comment.content}</span></div>
            </div>
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
