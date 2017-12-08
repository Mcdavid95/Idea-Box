import React, { Component } from 'react';
import PropTypes from 'prop-types';
import initialState from '../app/initialState';
/**
 * @class GroupForm
 * @extends React.Component
 */
export class CreateIdea extends Component {
  /**
   * Creates Instance of CreateIdea
   * @param {Object} props
   * @memberOf CreateIdea
   */
  constructor(props) {
    super(props);
    this.state = initialState.idea;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
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
    this.props.createIdeaRequest(this.state);
  }

  /**
     * @method handleSelectChange
     * @param {Event} event
     * @return {state} sets state of button
     */
  handleSelectChange(event) {
    this.setState({ status: event.target.value });
  }

  /**
   * @return {DOM} DOM Object
   */
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="idea-form">
          <div className="input-field">
            <label htmlFor="title" className="control-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={this.state.title}
              required
              onChange={this.onChange}
            />
          </div>
          <div className="input-field">
            <textarea
              value={this.state.description}
              name="description"
              type="text"
              className="materialize-textarea"
              onChange={this.onChange}
              required
            />
            <label htmlFor="textarea1">Description</label>
          </div>
          <div className="input-field col s12" >
            <label htmlFor="category" className="control-label">Category: </label>
            <input
              onChange={this.onChange}
              list="categories"
              type="text"
              id="category"
              className="form-control"
              name="category"
              required
              value={this.state.category}
            />
            <datalist id="categories">
              <option value="Family" />
              <option value="Tech" />
              <option value="Agriculture" />
              <option value="AI" />
              <option value="Entertainment" />
            </datalist>
          </div>
          <div className="input-field col s7 m6 select-dropdown">
            <span>Access:</span>
            <select
              value={this.state.status}
              id="options"
              className="browser-default"
              onChange={this.handleSelectChange}
            >
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
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
    );
  }
}

CreateIdea.propTypes = {
  createIdeaRequest: PropTypes.func.isRequired

};


export default CreateIdea;
