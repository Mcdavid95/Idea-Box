import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compiler } from 'markdown-to-jsx';
import shortId from 'shortid';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import SideNav from '../containers/SideNav';
import CreateIdea from '../components/CreateIdea';
import Header from '../components/Header/Header';
import { createIdeaRequest, getByCategory } from '../actions';

/**
 * @class GetPublicIdeas
 */
class CategoryPage extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      categoryIdeas: this.props.getCategory,
      pages: 0,
      currentPage: 1,
      category: this.props.match.params.category
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  /**
   *
   * @return {*} loads actions when page loads initially
   */
  componentDidMount() {
    this.props.getByCategory(this.state.category, this.state.category);
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
    if (nextProps.getCategory === 0) {
      this.setState({
        categoryIdeas: nextProps.getCategory[0].ideas,
        pages: nextProps.getCategory[0].pages,
        category: nextProps.match.params.category
      });
    } else {
      this.setState({
        categoryIdeas: nextProps.getCategory[nextProps.getCategory.length - 1].ideas,
        pages: nextProps.getCategory[nextProps.getCategory.length - 1].pages,
        category: nextProps.match.params.category
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
    this.props.getByCategory(this.state.category, selected + 1);
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
      this.props.getByCategory(this.state.category, this.state.currentPage - 1);
      const newOffset = this.state.currentPage;
      this.setState({
        currentPage: newOffset - 1
      });
    }
  }
  /**
   *
   * @param {*} event
   * @return {DOM} next set of results
   */
  nextPage(event) {
    event.preventDefault();
    this.props.getByCategory(this.state.category, this.state.currentPage + 1);
    const newOffset = this.state.offset;
    this.setState({
      currentPage: newOffset + 1
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
        <SideNav category={this.props.match.params.category} />
        <main>
          <div id="modal1" className="modal  modal-fixed-footer">
            <div className="modal-content">
              <h3 className="idea-form heading">Create New Idea</h3>
              <CreateIdea
                createIdeaRequest={this.props.createIdeaRequest}
                getCurrentIdeas={this.props.getByCategory}
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
              { this.state.categoryIdeas.length > 0 ? this.state.categoryIdeas.map(ideas => (
                <li className="col s12 m6 l4" key={shortId.generate()}>
                  <div className="card sticky-action medium white">
                    <div className="card-content black-text">
                      <span className="card-title activator grey-text text-darken-4">{ideas.title}
                        <i className="material-icons right">more_vert</i>
                      </span>
                      <br />
                      <p className="black-text">
                        <strong>Category:</strong>
                        <span className="new badge" data-badge-caption="">{ideas.categories}</span>
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
                      <Link to={`/idea/id/${ideas._id}`}><i className="material-icons">comment</i> Comment</Link>
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
                    </div>
                  </div>
                </li>
            )) : (<h3> There are no ideas for this category</h3>)}
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
  getCategory: state.getCategory
});

CategoryPage.propTypes = {
  createIdeaRequest: PropTypes.func.isRequired,
  getCategory: PropTypes.array.isRequired,
  getByCategory: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { createIdeaRequest, getByCategory })(CategoryPage);
