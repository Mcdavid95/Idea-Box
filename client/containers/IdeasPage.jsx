import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createIdeaRequest } from '../actions/idea';
import Header from '../components/Header/Header';
import CreateIdea from '../components/CreateIdea';
import GetPublicIdeas from './GetPublicIdeas';
import SideNav from '../containers/SideNav';
import { getPublicIdeas } from '../actions';

export const IdeasPage = props => (
  <div className="white-text idea-page">
    <Header />
    <SideNav />
    <main>
      <div id="modal1" className="modal  modal-fixed-footer">
        <div className="modal-content">
          <h3 className="idea-form heading">Create New Idea</h3>
          <CreateIdea
            createIdeaRequest={props.createIdeaRequest}
            getCurrentIdeas={props.getPublicIdeas}
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
      <GetPublicIdeas getIdeas={props.getIdeas} />
    </main>
  </div>
);

const mapStateToProps = state => ({
  getIdeas: state.getIdeas
});

IdeasPage.propTypes = {
  createIdeaRequest: PropTypes.func.isRequired,
  getPublicIdeas: PropTypes.func.isRequired,
  getIdeas: PropTypes.array.isRequired

};
export default connect(mapStateToProps, { createIdeaRequest, getPublicIdeas })(IdeasPage);
