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
      <Link to="/drinks">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="button drinks" />
      </Link>
      <Link to="/">
        <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="button explore" />
      </Link>
      <Link to="/foods">
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="button food" />
      </Link>
    </footer>
  );
}

// Footer.propTypes = {};
