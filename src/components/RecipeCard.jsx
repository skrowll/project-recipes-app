import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ recipe, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` } className="recipe-card">
      <img
        data-testid={ `${index}-card-img` }
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
      />
      <h3 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h3>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
}.isRequired;
