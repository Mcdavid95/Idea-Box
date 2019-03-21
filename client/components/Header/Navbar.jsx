import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @method Navbar
 * @param {*} props
 * @returns {DOM} DOM Element
 * @description renders the signup page
 */
const Navbar = () => (
  <div className="landing-page">
    <nav>
      <div className="nav-wrapper">
        <a href="#" className="brand-logo" id="brand-logo">IDEA-BOX</a>
        <div className="container">
          <Link to="/ideas/search"><i className="material-icons right">search</i></Link>
        </div>
      </div>
    </nav>
  </div>
);
export default Navbar;
