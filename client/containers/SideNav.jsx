import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { logout, getByCategory } from '../actions';
/**
 *
 */
export class SideNav extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      category: this.props.category
    };

    this.onClick = this.onClick.bind(this);
  }
  /**
   *
   * @return {*} loads actions when page loads initially
   */
  componentDidMount() {
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
      category: nextProps.category
    });
    this.props.getByCategory(nextProps.category, 1);
  }

  /**
     * @return {Props} listens for event and returns props
     * @param {string} category
     * @param {number} page current page number
     */
  onClick(category, page) {
    this.props.getByCategory(category, page);
  }

  /**
       * @return {Props} listens for event and returns props
       * @param {*} event
       */
  logout(event) {
    event.preventDefault();
    this.props.logout();
  }
  /**
   * @return {DOM} Dom component
   */
  render() {
    $(document).ready(() => {
      $('.collapsible').collapsible();
      $('.button-collapse').sideNav();
    });
    return (
      <div>
        <ul id="slide-out" className="side-nav fixed">
          <li className="no-padding">
            <ul className="collapsible collapsible-accordion">
              <li>
                <a
                  className="collapsible-header"
                >My Profile
                  <i className="material-icons"> arrow_drop_down</i>
                  <i className="material-icons" id="set-color">account_circle</i>
                </a>
                <div className="collapsible-body">
                  <ul>
                    <li className="black-text logout-button" id="logout-button">
                      <NavLink to="/" onClick={this.logout}>Logout</NavLink>
                    </li>
                    <li className="black-text logout-button" id="logout-button">
                      <NavLink to="/profile/edit">Update Profile</NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </li>
          <li><div className="divider" /></li>
          <li><a className="subheader"><strong>Ideas</strong></a></li>
          <li className="black-text logout-button" id="logout-button">
            <NavLink to="/my-ideas">My Ideas</NavLink>
          </li>
          <li><Link to="/ideas">All Ideas</Link></li>
          <li>
            <a href="#modal1" className=" modal-trigger">Create New Idea
              <i className="material-icons amber-text">
        library_add
              </i>
            </a>
          </li>
          <li className="no-padding">
            <ul className="collapsible collapsible-accordion">
              <li>
                <a className="collapsible-header">Categories
                  <i className="material-icons amber-text">view_list</i>
                </a>
                <div className="collapsible-body">
                  <ul>
                    <li className="black-text">
                      <Link
                        className="family"
                        onClick={() => this.onClick(this.state.category, 1)}
                        to="/idea/category/Family"
                      >
                      Family
                      </Link>
                    </li>
                    <li className="black-text">
                      <Link
                        className="tech"
                        onClick={() => this.onClick(this.state.category, 1)}
                        to="/idea/category/Tech"
                      >
                      Tech
                      </Link>
                    </li>
                    <li className="black-text">
                      <Link
                        className="agriculture"
                        onClick={() => this.onClick(this.state.category, 1)}
                        to="/idea/category/Agriculture"
                      >
                      Agriculture
                      </Link>
                    </li>
                    <li className="black-text">
                      <Link
                        className="entertainment"
                        onClick={() => this.onClick(this.state.category, 1)}
                        to="/idea/category/Entertainment"
                      >
                      Entertainment
                      </Link>
                    </li>
                    <li className="black-text">
                      <Link
                        className="social-media"
                        onClick={() => this.onClick(this.state.category, 1)}
                        to="/idea/category/Social Media"
                      >
                      Social Media
                      </Link>
                    </li>
                    <li className="black-text">
                      <Link
                        className="community"
                        onClick={() => this.onClick(this.state.category, 1)}
                        to="/idea/category/Community"
                      >Community
                      </Link>
                    </li>
                    <li className="black-text">
                      <Link
                        className="education"
                        onClick={() => this.onClick(this.state.category, 1)}
                        to="/idea/category/Education"
                      >Education
                      </Link>
                    </li>
                    <li className="black-text">
                      <Link
                        className="infastructure"
                        onClick={() => this.onClick(this.state.category, 1)}
                        to="/idea/category/Infastructure"
                      >Infastructure
                      </Link>
                    </li>
                    <li className="black-text">
                      <Link
                        className="telecom"
                        onClick={() => this.onClick(this.state.category, 1)}
                        to="/idea/category/Telecom"
                      >Telecom
                      </Link>
                    </li>
                    <li className="black-text">
                      <Link
                        className="computer-science"
                        onClick={() => this.onClick(this.state.category, 1)}
                        to="/idea/category/Computer Science"
                      >Computer Science
                      </Link>
                    </li>
                    <li className="black-text">
                      <Link
                        className="transport"
                        onClick={() => this.onClick(this.state.category, 1)}
                        to="/idea/category/Transport"
                      >Transport
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <a href="#" data-activates="slide-out" className="button-collapse">
          <i className="material-icons">menu</i>
        </a>
      </div>
    );
  }
}

const sideNavPropTypes = () => {
  const sideNav = new SideNav();
  if (sideNav.props.category) {
    return {
      logout: PropTypes.func.isRequired,
      getByCategory: PropTypes.func.isRequired,
      category: PropTypes.string.isRequired
    };
  }
  return {
    getByCategory: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired
  };
};


SideNav.propTypes = sideNavPropTypes;

export default connect(null, { logout, getByCategory })(SideNav);
