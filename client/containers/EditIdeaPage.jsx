import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';
import SideNav from './SideNav';
import { editIdea, updateIdea } from '../actions';
/**
 * @class EditIdeaPage
 * @extends React.Component
 */
export class EditIdeaPage extends Component {
  /**
   * Creates Instance of EditIdeaPage
   * @param {Object} props
   * @memberOf EditIdeaPage
   */
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.currentIdea.title,
      description: this.props.currentIdea.description,
      category: this.props.currentIdea.category,
      status: this.props.currentIdea.status
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  /**
   *
   * @return {*} loads actions when page loads initially
   */
  componentDidMount() {
    this.props.editIdea(this.props.match.params.id);
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
      title: nextProps.currentIdea.title,
      description: nextProps.currentIdea.description,
      category: nextProps.currentIdea.category,
      status: nextProps.currentIdea.status
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
    this.props.updateIdea(this.props.match.params.id, this.state);
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
      <div className="white-text idea-page">
        <Header />
        <SideNav />
        <main>
          <div className="container white">
            <form id="edit" onSubmit={this.onSubmit} className="idea-form">
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
              <div className="input-field select-dropdown">
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
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentIdea: state.editIdea
});

EditIdeaPage.propTypes = {
  editIdea: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  currentIdea: PropTypes.object.isRequired,
  updateIdea: PropTypes.func.isRequired
};


export default connect(mapStateToProps, { editIdea, updateIdea })(EditIdeaPage);
