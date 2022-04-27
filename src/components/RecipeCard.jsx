import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ title, image, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` } className="recipe-card">
      <img
        data-testid={ `${index}-card-img` }
        src={ image }
        alt={ title }
      />
      <h3 data-testid={ `${index}-card-name` }>{ title }</h3>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
}.isRequired;
