import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMde, { ReactMdeCommands } from 'react-mde';
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
    this.handleMarkdown = this.handleMarkdown.bind(this);
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
    const {
      title, category, reactMdeValue, status
    } = this.state;
    const newIdea = {
      title,
      category,
      description: reactMdeValue.text,
      status
    };
    this.props.createIdeaRequest(newIdea);
    this.props.getCurrentIdeas(1);
    this.setState({
      title: '',
      reactMdeValue: { text: '', selection: null },
      category: '',
      status: ''
    });
  }
  /**
   *
   * @param {Event} value
   * @return {Object} updates State
   */
  handleMarkdown(value) {
    this.setState({ reactMdeValue: value });
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
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="form-control"
              value={this.state.title}
              required
              onChange={this.onChange}
            />
          </div>
          <div className="input-field select-dropdown">
            <div>
              <ReactMde
                textAreaProps={{
              id: 'ta1',
              name: 'ta1',
            }}
                value={this.state.reactMdeValue}
                placeholder="Description"
                onChange={this.handleMarkdown}
                commands={ReactMdeCommands.getDefaultCommands()}
              />
            </div>
          </div>
          <div className="input-field col s12" >
            <select
              id="categories"
              name="category"
              className="browser-default"
              value={this.state.category}
              onChange={this.onChange}
            >
              <option value="" disabled defaultValue>Select a Category</option>
              <option value="Family">Family</option>
              <option value="Tech">Tech</option>
              <option value="Agriculture">Agriculture</option>
              <option value="AI">AI</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Social Media">Social Media</option>
              <option value="Community">Community</option>
              <option value="Education">Education</option>
              <option value="Infastructure">Infastructure</option>
              <option value="Telecom">Telecom</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Transport">Transport</option>
              <option value="Art and Craft">Entertainment</option>
            </select>
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
  createIdeaRequest: PropTypes.func.isRequired,
  getCurrentIdeas: PropTypes.func.isRequired

};


export default CreateIdea;
