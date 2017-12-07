import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../../containers/Search';

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
        <a href="#" className="brand-logo">Logo</a>
        <Search />
      </div>
    </nav>
  </div>
);
export default Navbar;
