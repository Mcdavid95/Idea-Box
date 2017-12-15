import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { compiler } from 'markdown-to-jsx';
import shortId from 'shortid';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SideNav from '../containers/SideNav';
import Header from '../components/Header/Header';
import { searchIdea } from '../actions';

/**
 * @class Search
 */
class Search extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      result: [],
      offset: 0,
      pages: 0
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * @method ComponentWillRecieveProps
   * @param {*} nextProps
   * @description updates state when props changes
   * @return {*} new state
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.result.length === 0) {
      this.setState({
        result: nextProps.result.idea.ideas,
        pages: nextProps.result.idea.pageInfo
      });
    } else {
      this.setState({
        result: nextProps.result[nextProps.result.length - 1].idea.ideas,
        pages: nextProps.result[nextProps.result.length - 1].idea.pageInfo.count
      });
    }
  }
  /**
   * @method onChange
   * @param {*} event
   * @description updates state on event change and makes call to api via props
   * @return {DOM} Dom
   */
  onChange(event) {
    const searchInput = {
      searchTerm: event.target.value
    };
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
    this.props.searchIdea(searchInput, this.state.offset);
  }
  /**
   * @method onSubmit
   * @param {*} event
   * @return {DOM} DOM element
   */
  onSubmit(event) {
    const searchInput = {
      username: event.target.value
    };
    event.preventDefault();
    this.props.searchIdea(searchInput, this.state.offset)
      .then(() => {
      });
  }
  /**
 * @method handlePageClick
 * @param {*} event
 * @return {DOM} returns a new page of result
 *
 */
  handlePageClick(event) {
    const { selected } = event;
    const limit = 5;
    const offset = Math.ceil(selected * limit);
    this.setState({
      offset
    });
    this.props.searchIdea(this.state, offset);
  }
  /**
   * @method prevPage
   * @param {*} event
   * @return {DOM} previous set of results
   */
  prevPage(event) {
    event.preventDefault();
    if (this.state.offset > 0) {
      this.props.searchIdea(this.state, this.state.offset - 1);
      const newOffset = this.state.currentPage;
      this.setState({
        offset: newOffset - 1
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
    this.props.searchIdea(this.state, this.state.offset + 1);
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
    const notFound = (
      <h5>Idea not found </h5>
    );
    const edited = (
      <span className="black-text"><em>Edited</em></span>
    );
    return (
      <div className="white-text idea-page">
        <Header />
        <SideNav />
        <main>
          <form className="center">
            <div className="input-field">
              <input
                id="search"
                type="search"
                value={this.state.searchTerm}
                name="searchTerm"
                required
                placeholder="Search Idea"
                onChange={this.onChange}
              />
              <button type="submit" className="btn-small right teal btn-floating">
                <i className="small material-icons">send</i>
              </button>
              <i className="material-icons">close</i>
            </div>
          </form>
          <div className="row show-ideas">
            <ul>
              { this.state.result.length > 0 ? this.state.result.map(ideas => (
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
        )) : notFound}
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
  result: state.search,
});

const searchPropTypes = () => {
  const search = new Search();
  if (typeof search.props.result === 'object') {
    return {
      searchIdea: PropTypes.func.isRequired,
      result: PropTypes.object.isRequired
    };
  }
  return {
    searchIdea: PropTypes.func.isRequired,
    result: PropTypes.array.isRequired
  };
};

Search.propTypes = searchPropTypes;

export default connect(mapStateToProps, { searchIdea })(Search);
