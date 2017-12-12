import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { getPublicIdeas } from '../actions';

/**
 * @class GetPublicIdeas
 */
class GetPublicIdeas extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      publicIdeas: this.props.getIdeas,
      pages: 0,
      currentPage: 1
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  /**
   *
   * @return {*} loads actions when page loads initially
   */
  componentDidMount() {
    this.props.getPublicIdeas(this.state.currentPage);
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
    if (nextProps.getIdeas === 0) {
      this.setState({
        publicIdeas: nextProps.getIdeas[0].ideas,
        pages: nextProps.getIdeas[0].pages
      });
    } else {
      this.setState({
        publicIdeas: nextProps.getIdeas[nextProps.getIdeas.length - 1].ideas,
        pages: nextProps.getIdeas[nextProps.getIdeas.length - 1].pages
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
    this.props.getPublicIdeas(selected + 1);
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
      this.props.getPublicIdeas(this.state.currentPage - 1);
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
    this.props.getPublicIdeas(this.state.currentPage + 1);
    const newOffset = this.state.offset;
    this.setState({
      offset: newOffset + 1
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
      <div>
        <div className="row show-ideas">
          <ul>
            { this.state.publicIdeas.map(ideas => (
              <li className="col s12 m6 l4" key={ideas._id}>
                <div className="card medium white">
                  <div className="card-content black-text">
                    <span className="card-title">{ideas.title}</span>
                    <p>{ideas.description}</p>
                    <br />
                    <p className="black-text"><strong>Category:</strong> {ideas.categories}</p>
                  </div>
                  <div className="card-action">
                    <Link to={`/idea/id/${ideas._id}`}>comment</Link>
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

      </div>
    );
  }
}

const mapStateToProps = state => ({
  getIdeas: state.getIdeas
});

GetPublicIdeas.propTypes = {
  getIdeas: PropTypes.array.isRequired,
  getPublicIdeas: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getPublicIdeas })(GetPublicIdeas);
