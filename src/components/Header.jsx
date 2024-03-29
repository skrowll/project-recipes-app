import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/components/FoodsHeader.css';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title, showSearchIcon }) {
  const [renderSearchBar, setRenderSearchBar] = useState(false);

  const handleClick = () => (setRenderSearchBar(!renderSearchBar));

  return (
    <header>
      <div className="headerContainer">
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Perfil"
          />
        </Link>
        <h2 data-testid="page-title">{ title }</h2>
        { showSearchIcon
          && (
            <button
              type="button"
              className="searchButton"
              onClick={ handleClick }
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="Pesquisar"
              />
            </button>
          )}
      </div>
      { showSearchIcon
        && (
          <div className="searchContainer">
            {renderSearchBar && <SearchBar />}
          </div>
        )}
    </header>
  );
}

Header.defaultProps = {
  showSearchIcon: false,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.bool,
};
