import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/components/Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <Link data-testid="drinks-bottom-btn" to="/drinks">
        <img src={ drinkIcon } alt="button drinks" />
      </Link>
      <Link data-testid="explore-bottom-btn" to="/">
        <img src={ exploreIcon } alt="button explore" />
      </Link>
      <Link data-testid="food-bottom-btn" to="/foods">
        <img src={ mealIcon } alt="button food" />
      </Link>
    </footer>
  );
}

// Footer.propTypes = {};
