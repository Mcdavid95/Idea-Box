import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import shortId from 'shortid';
import { compiler } from 'markdown-to-jsx';
import swal from 'sweetalert';
import SideNav from '../containers/SideNav';
import CreateIdea from '../components/CreateIdea';
import Header from '../components/Header/Header';
import { createIdeaRequest, getUserIdeas, deleteIdea } from '../actions';

/**
 * @class GetPublicIdeas
 */
class UserIdeaPage extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      ideas: this.props.userIdeas,
      pages: 0,
      currentPage: 1,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);
  }
  /**
   *
   * @return {*} loads actions when page loads initially
   */
  componentDidMount() {
    this.props.getUserIdeas(this.state.currentPage);
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
    if (nextProps.userIdeas.length === 1) {
      this.setState({
        ideas: nextProps.userIdeas[0].ideas,
        pages: nextProps.userIdeas[0].pages,
      });
    } else {
      this.setState({
        ideas: nextProps.userIdeas[nextProps.userIdeas.length - 1].ideas,
        pages: nextProps.userIdeas[nextProps.userIdeas.length - 1].pages,
      });
    }
  }

  /**
 * @method handlePageClick
 * @param {*} event
 * @return {DOM} returns a new page of result
 *
 */
  handlePageClick(event) {
    const { selected } = event;
    this.props.getUserIdeas(selected + 1);
    this.setState({
      currentPage: selected + 1
    });
  }
  /**
   * @method prevPage
   * @param {*} event
   * @return {DOM} previous set of results
   */
  prevPage(event) {
    event.preventDefault();
    if (this.state.offset > 0) {
      this.props.getUserIdeas(this.state.currentPage - 1);
      const newOffset = this.state.currentPage;
      this.setState({
        currentPage: newOffset - 1
      });
    }
  }
  /**
   * @method nextPagee
   * @param {*} event
   * @return {DOM} next set of results
   */
  nextPage(event) {
    event.preventDefault();
    this.props.getUserIdeas(this.state.category, this.state.currentPage + 1);
    const newOffset = this.state.offset;
    this.setState({
      currentPage: newOffset + 1
    });
  }
  /**
   *@method deleteIdea
 * @returns {DOM} modal with succes message
 * @param {*} ideaId id of idea to be deleted
 */
  deleteIdea(ideaId) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to recover the document",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      allowOutsideClick: false,
    }).then(() => {
      this.props.deleteIdea(ideaId).then(() => {
        this.props.getUserIdeas(this.state.currentPage);
      });

      swal({
        type: 'success',
        html: 'Idea succesfully deleted',
        title: 'Success',
        allowOutsideClick: false,
        showCloseButton: true,
        confirmButtonText: 'Ok',
      });
    });
  }

  /**
 * @method render
 * @description renders the Dom
 * @returns {DOM} returns DOM element
 */
  render() {
    const edited = (
      <span className="black-text"><em>Edited</em></span>
    );
    return (
      <div className="white-text idea-page">
        <Header />
        <SideNav />
        <main>
          <div id="modal1" className="modal  modal-fixed-footer">
            <div className="modal-content">
              <h3 className="idea-form heading">Create New Idea</h3>
              <CreateIdea
                createIdeaRequest={this.props.createIdeaRequest}
                getCurrentIdeas={this.props.getUserIdeas}
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
          <div className="row show-ideas">
            <ul>
              { this.state.ideas.length > 0 ? this.state.ideas.map(ideas => (
                <li className="col s12 m6 l4" key={shortId.generate()}>
                  <div className="card sticky-action medium white">
                    <div className="card-content black-text">
                      <span className="card-title activator grey-text text-darken-4"> {ideas.title}
                        <i className="material-icons right">more_vert</i>
                      </span>
                      <br />
                      <p className="black-text">
                        <strong>Category:</strong>
                        <span className=" new badge" data-badge-caption="">{ideas.categories}</span>
                      </p>
                      <p className="black-text">
                        <strong>Status:</strong>
                        <span className="black-text edited">{ideas.status}</span>
                      </p>
                      <hr />
                      <div className="truncate">{typeof ideas.description === 'string' ? compiler(ideas.description) : ''}</div>
                    </div>
                    <div className="card-reveal black-text">
                      <span className="card-title grey-text text-darken-4">
                      Card Title<i className="material-icons right">close</i>
                      </span>
                      <div>{typeof ideas.description === 'string' ? compiler(ideas.description) : ''}</div>
                    </div>
                    <div className="card-action">
                      <Link to={`/idea/edit/${ideas._id}`}><i className="material-icons">edit</i></Link>
                      <a
                        href={`https://twitter.com/intent/tweet?text=This%20is%20amazing%20you%20should%20read%20it&url=${window.location.origin}/idea/${ideas._id}`}
                        className="tooltipped center"
                        data-position="bottom"
                        data-delay="50"
                        data-tooltip="Like this? share on twitter"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <i className="material-icons">
                          share
                        </i>
                      </a>
                      {ideas.modified ? edited : ''}
                      <span onClick={() => this.deleteIdea(ideas._id)}>
                        <i className="right material-icons red-text">delete_sweep</i>
                      </span>
                    </div>
                  </div>
                </li>
            )) : (<h3> You have no ideas</h3>) }
            </ul>
          </div>
          <ReactPaginate
            previousLabel="previous"
            nextLabel="next"
            pageCount={this.state.pages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userIdeas: state.userIdeas
});

UserIdeaPage.propTypes = {
  createIdeaRequest: PropTypes.func.isRequired,
  userIdeas: PropTypes.array.isRequired,
  getUserIdeas: PropTypes.func.isRequired,
  deleteIdea: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  createIdeaRequest,
  getUserIdeas,
  deleteIdea
})(UserIdeaPage);

