import React, { Component } from 'react';
import PropTypes from 'prop-types';
import initialState from '../app/initialState';
/**
 * @class CommentForm
 * @extends React.Component
 */
export default class CommentForm extends Component {
  /**
   * @constructor
   * @description Creates Instance of CommentForm
   * @param {Object} props
   * @memberOf CommentForm
   */
  constructor(props) {
    super(props);
    this.state = initialState.comment;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * @method onChange
   * @param {Event} event
   * @return {Object} updates State
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @method onSubmit
   * @param {Event} event
   * @return {Object} new State
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.sendComment(this.state, this.props.id);
  }
  /**
   * @return {DOM} DOM Object
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="s12">
            <form className="col s12" onSubmit={this.onSubmit}>
              <div className="row comment">
                <div className="input-field col s8 m8 l8">
                  <label htmlFor="comment" className="control-label black-text">Comment: </label>
                  <input
                    type="text"
                    id="comment"
                    name="comment"
                    value={this.state.comment}
                    className="form-control login"
                    required
                    onChange={this.onChange}
                  />
                </div>
                <button type="submit" className="btn landing-buttons ">
                  <i className="material-icons">send</i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  sendComment: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};
