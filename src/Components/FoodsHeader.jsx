import React from 'react';

import '../styles/components/FoodsHeader.css';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  return (
    <header>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="Perfil" />
      <h2 data-testid="page-title">Foods</h2>
      <img data-testid="search-top-btn" src={ searchIcon } alt="Pesquisar" />
    </header>
  );
}
