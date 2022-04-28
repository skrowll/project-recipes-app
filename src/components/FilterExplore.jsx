import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function FilterExplore({ renderButton, routeInfredientes }) {
  return (
    <div>
      <Link to={ routeInfredientes }>
        <button type="button" data-testid="explore-by-ingredient">By Ingredient</button>
      </Link>
      {renderButton
      && (
        <Link to="/explore/foods/nationalities">
          <button
            type="button"
            data-testid="explore-by-nationality"
          >
            By Nationality
          </button>
        </Link>
      )}
      <button type="button" data-testid="explore-surprise">Surprise me!</button>
    </div>
  );
}
FilterExplore.propTypes = {
  renderButton: PropTypes.bool,
  routeInfredientes: PropTypes.string,
}.isRequired;
