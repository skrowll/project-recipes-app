import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { containsIngredient, isFavorite, removeFavorite, removeInProgressIngredient,
  request, saveFavorite, saveInProgressIngredient,
  saveFinish } from '../services/services';
import { recipeDetailsEndpoint } from './FoodRecipe';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import '../styles/pages/RecipeInProgress.css';

export default function FoodRecipeInProgress({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [linkCopied, setLinkCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const getIngredients = () => {
    const ingredients = Object.keys(recipe)
      .filter((key) => key.includes('strIngredient'));
    if (ingredients) {
      return ingredients.map((key) => recipe[key])
        .filter((ing) => ing !== '' && ing !== null);
    }
    return [];
  };

  const handleFinish = () => {
    const ingredient = document.querySelectorAll('input:checked').length
    === getIngredients().length;
    console.log(ingredient);
    setDisabled(!ingredient);
    console.log(disabled);
  };

  useEffect(() => {
    request(recipeDetailsEndpoint + id).then((res) => {
      setRecipe(res.meals[0]);
    });
    setFavorite(isFavorite(id, 'food'));
  }, [id]);

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
    clipboardCopy(`http://localhost:3000/foods/${id}`);
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
      <Header title="Recipe in progress" />
      <div className="recipeInProgressContainer">
        <div className="imageContainer">
          <img
            data-testid="recipe-photo"
            className="recipeImage"
            // style={ { width: '400px' } }
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
          />
        </div>
        {linkCopied && <p>Link copied!</p>}
        <h3 className="recipeName" data-testid="recipe-title">{ recipe.strMeal }</h3>
        <p data-testid="recipe-category">{ `Category: ${recipe.strCategory}` }</p>
        <div className="socialContainer">
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
        </div>
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
                    onClick={ handleFinish }
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
        <Link to="/done-recipes">
          <button
            data-testid="finish-recipe-btn"
            type="button"
            className="finishButton"
            disabled={ disabled }
            onClick={
              () => saveFinish({
                id: recipe.idMeal,
                type: 'food',
                nationality: recipe.strArea,
                category: recipe.strCategory,
                alcoholicOrNot: '',
                name: recipe.strMeal,
                image: recipe.strMealThumb,
              })
            }
          >
            Finish
          </button>
        </Link>
      </div>
    </div>
  );
}

FoodRecipeInProgress.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
};
