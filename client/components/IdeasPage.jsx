import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import SideNav from '../containers/SideNav';


const IdeasPage = () => (
  <div className="white-text idea-page">
    <Header />
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
                <Link to="/">
                  <li className="black-text logout-button" id="logout-button">Logout</li>
                  <li className="black-text logout-button" id="logout-button">My Ideas</li>
                  <li className="black-text logout-button" id="logout-button">Update Profile</li>
                </Link>
                <li>Update Account details</li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
      <li><div className="divider" /></li>
      <li><a className="subheader">Ideas</a></li>
      <li>
        <a>Create New Idea<i className="material-icons amber-text">library_add</i></a>
      </li>
      <li className="no-padding">
        <ul className="collapsible collapsible-accordion">
          <li>
            <a className="collapsible-header">Categories
              <i className="material-icons amber-text">view_list</i>
            </a>
            <div className="collapsible-body">
              <ul>
                <Link to="/">
                  <li className="black-text logout-button" id="logout-button">Logout</li>
                  <li className="black-text logout-button" id="logout-button">My Ideas</li>
                  <li className="black-text logout-button" id="logout-button">Update Profile</li>
                </Link>
                <li>Update Account details</li>
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
export default IdeasPage;
