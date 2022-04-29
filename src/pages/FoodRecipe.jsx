import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import request from '../services/services';

const recipeDetailsEndpoint = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

export default function FoodRecipe({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    request(recipeDetailsEndpoint + id).then((res) => {
      setRecipe(res.meals[0]);
    });
  }, [id]);

  const getIngredients = () => {
    const ingredients = Object.keys(recipe)
      .filter((key) => key.includes('strIngredient'));
    if (ingredients) {
      return ingredients.map((key) => recipe[key])
        .filter((ing) => ing !== '');
    }
    return [];
  };

  return (
    <div>
      <img
        style={ { width: '400px' } } // remover se for estilzar com css
        data-testid="recipe-photo"
        src={ recipe.strMealThumb }
        alt="s"
      />
      <h3 data-testid="recipe-title">{ recipe.strMeal }</h3>
      <button data-testid="start-recipe-btn" type="button">Start</button>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      <p data-testid="recipe-category">{ recipe.strCategory }</p>
      <ul>
        {getIngredients().map((ingredient, index) => (
          <li
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient}
          </li>))}
      </ul>
      <br />
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <iframe
        data-testid="video"
        title="tutorial"
        width="560"
        height="315"
        src={ recipe.strYoutube?.replace('watch?v=', 'embed/') }
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}

FoodRecipe.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
};
