import React from 'react';

const Search = () => (
  <form className="right">
    <div className="input-field">
      <input id="search" type="search" required placeholder="Search Idea" />
      <label className="label-icon" htmlFor="search">
        <i className="material-icons">search</i>
      </label>
      <i className="material-icons">close</i>
    </div>
  </form>
);
export default Search;
