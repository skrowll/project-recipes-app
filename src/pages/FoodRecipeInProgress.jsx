import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { containsIngredient, isFavorite, removeFavorite, removeInProgressIngredient,
  request, saveFavorite, saveInProgressIngredient } from '../services/services';
import { recipeDetailsEndpoint } from './FoodRecipe';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

export default function FoodRecipeInProgress({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [linkCopied, setLinkCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    request(recipeDetailsEndpoint + id).then((res) => {
      setRecipe(res.meals[0]);
    });
    setFavorite(isFavorite(id, 'food'));
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
      saveInProgressIngredient('meals', id, value);
      // aqui adiciona o risco
    } else {
      removeInProgressIngredient('meals', id, value);
      // retira o risco
    }
    setCheckedIngredients({ ...checkedIngredients, [value]: checked });
  };
  const copy = () => {
    clipboardCopy(`http://localhost:3000/foods/${id}}`);
    setLinkCopied(true);
  };

  const handleFavoriteClick = () => {
    if (!isFavorite(recipe.idMeal, 'food')) {
      saveFavorite({
        id: recipe.idMeal,
        type: 'food',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      });
      setFavorite(true);
      return;
    }
    removeFavorite(recipe.idMeal);
    setFavorite(false);
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        style={ { width: '400px' } }
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
      />
      {linkCopied && <p>Link copied!</p>}
      <h3 data-testid="recipe-title">{ recipe.strMeal }</h3>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ copy }
      >
        <img src={ shareIcon } alt="Share" />

      </button>
      <button
        type="button"
        onClick={ handleFavoriteClick }
      >
        <img
          data-testid="favorite-btn"
          src={ favorite ? blackHeart : whiteHeart }
          alt="whiteHeart"
        />
      </button>
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
                  checked={ containsIngredient('meals', id, ingredient) }
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

FoodRecipeInProgress.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
};
