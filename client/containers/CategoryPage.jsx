import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import SideNav from '../containers/SideNav';
import Header from '../components/Header/Header';
import { getByCategory } from '../actions';

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
          <div className="row show-ideas">
            <ul>
              { this.state.categoryIdeas.map(ideas => (
                <li className="col s12 m6 l4" key={ideas._id}>
                  <div className="card white">
                    <div className="card-content black-text">
                      <span className="card-title">{ideas.title}</span>
                      <p>{ideas.description}</p>
                      <br />
                      <p className="black-text"><strong>Category:</strong><span className="new badge" data-badge-caption="">{ideas.categories}</span></p>
                    </div>
                    <div className="card-action">
                      <Link to={`/idea/id/${ideas._id}`}><i className="material-icons">comment</i> Comment</Link>
                      {ideas.modified ? edited : ''}
                    </div>
                  </div>
                </li>
            ))}
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
  getCategory: PropTypes.array.isRequired,
  getByCategory: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getByCategory })(CategoryPage);
