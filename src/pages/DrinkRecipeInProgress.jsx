import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { containsIngredient, removeInProgressIngredient, request,
  saveInProgressIngredient } from '../services/services';
import { recipeDetailsEndpoint } from './DrinkRecipe';

export default function DrinkRecipeInProgress({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState({});

  useEffect(() => {
    request(recipeDetailsEndpoint + id).then((res) => {
      setRecipe(res.drinks[0]);
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

  const ingredientChange = ({ target: { value, checked } }) => {
    if (checked) {
      saveInProgressIngredient('cocktails', id, value);
    } else {
      removeInProgressIngredient('cocktails', id, value);
    }
    setCheckedIngredients({ ...checkedIngredients, [value]: checked });
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        style={ { width: '400px' } }
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
      />
      <h3 data-testid="recipe-title">{recipe.strDrink}</h3>
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
                  checked={ containsIngredient('cocktails', id, ingredient) }
                  onChange={ ingredientChange }
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

DrinkRecipeInProgress.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
};
