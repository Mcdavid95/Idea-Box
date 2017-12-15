import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import { Link } from 'react-router-dom';
import { compiler } from 'markdown-to-jsx';
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
            { this.state.publicIdeas.length > 0 ? this.state.publicIdeas.map(ideas => (
              <li className="col s12 m6 l4" key={shortId.generate()}>
                <div className="card sticky-action medium white">
                  <div className="card-content black-text ">
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
                    <Link to={`/idea/id/${ideas._id}`}><i className="material-icons">comment</i>Comment</Link>
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
