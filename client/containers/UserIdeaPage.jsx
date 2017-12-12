import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import SideNav from '../containers/SideNav';
import Header from '../components/Header/Header';
import { getUserIdeas } from '../actions';

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
    if (nextProps.userIdeas === 0) {
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
   *
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
          <div className="row show-ideas">
            <ul>
              { this.state.ideas.map(ideas => (
                <li className="col s12 m6 l4" key={ideas._id}>
                  <div className="card medium white">
                    <div className="card-content black-text">
                      <span className="card-title">{ideas.title}</span>
                      <p>{ideas.description}</p>
                      <br />
                      <p className="black-text"><strong>Category:</strong> {ideas.categories}</p>
                      <p className="black-text"><strong>Status:</strong> <span className="black-text edited">{ideas.status}</span></p>
                    </div>
                    <div className="card-action">
                      <Link to={`/idea/edit/${ideas._id}`}>Edit</Link>
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
  userIdeas: state.userIdeas
});

UserIdeaPage.propTypes = {
  userIdeas: PropTypes.array.isRequired,
  getUserIdeas: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getUserIdeas })(UserIdeaPage);
