import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @method LandingPage
 * @param {*} props
 * @returns {DOM} DOM Element
 * @description renders the signup page
 */
const LandingPage = () => (
  <div className="landing-page">
    <nav>
      <div className="nav-wrapper">
        <a href="#" className="brand-logo">Logo</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="sass.html">Sass</a></li>
          <li><a href="badges.html">Components</a></li>
          <li><a href="collapsible.html">JavaScript</a></li>
        </ul>
      </div>
    </nav>
    <div className="center" id="buttons">
      <Link to="/register">
        <button id="register" className="btn landing-buttons">Register</button>
      </Link>
      <Link to="/login">
        <button id="login" className="btn landing-buttons">Login</button>
      </Link>
    </div>
  </div>
);
export default LandingPage;
