import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { request } from '../services/services';
import { recipeDetailsEndpoint } from './FoodRecipe';

export default function FoodRecipeInProgress({ match: { params: { id } } }) {
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
        .filter((ing) => ing !== '' && ing !== null);
    }
    return [];
  };

  const getMeasures = () => {
    const measures = Object.keys(recipe)
      .filter((key) => key.includes('strMeasure'));
    if (measures) {
      return measures.map((key) => recipe[key])
        .filter((ing) => ing !== '' && ing !== null);
    }
    return [];
  };

  const onClick = () => {
    const inputcheckbox = document.querySelectorAll('input:checked');
    const ingredient = [];
    inputcheckbox.forEach(({ value }) => ingredient.push(value));
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({ meals: { [`${id}`]: ingredient } }));
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        style={ { width: '400px' } }
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
      />
      <h3 data-testid="recipe-title">{recipe.strMeal}</h3>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      <ul>
        {
          getIngredients().map((ingredient, index) => (
            <li
              key={ ingredient }
              data-testid={ `${index}-ingredient-step` }
            >
              <label htmlFor={ `${index}-ingedient-step` }>
                <input
                  id={ `${index}-ingedient-step` }
                  type="checkbox"
                  value={ ingredient }
                  onClick={ onClick }
                />
                &nbsp;
                {`${ingredient} 
                  ${getMeasures()[index] ? `- ${getMeasures()[index]}` : ''}`}
              </label>
            </li>))
        }
      </ul>
      <br />
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <br />
      <button data-testid="finish-recipe-btn" type="button">Finish</button>
    </div>
  );
}

FoodRecipeInProgress.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
};
