import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { containsIngredient, isFavorite,
  removeFavorite, removeInProgressIngredient, request,
  saveFavorite,
  saveInProgressIngredient } from '../services/services';
import { recipeDetailsEndpoint } from './DrinkRecipe';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

export default function DrinkRecipeInProgress({ match: { params: { id } } }) {
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
      setRecipe(res.drinks[0]);
    });
    setFavorite(isFavorite(id, 'drink'));
    console.log(getIngredients());
    handleFinish();
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
      saveInProgressIngredient('cocktails', id, value);
    } else {
      removeInProgressIngredient('cocktails', id, value);
    }
    setCheckedIngredients({ ...checkedIngredients, [value]: checked });
  };
  const copy = () => {
    clipboardCopy(`http://localhost:3000/drinks/${id}`);
    setLinkCopied(true);
  };

  const handleFavoriteClick = () => {
    if (!isFavorite(recipe.idDrink, 'drink')) {
      saveFavorite({
        id: recipe.idDrink,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      });
      setFavorite(true);
      return;
    }
    removeFavorite(recipe.idDrink);
    setFavorite(false);
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        style={ { width: '400px' } }
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
      />
      {linkCopied && <p>Link copied!</p>}
      <h3 data-testid="recipe-title">{ recipe.strDrink }</h3>
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
                  checked={ containsIngredient('cocktails', id, ingredient) }
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
          disabled={ disabled }
        >
          Finish
        </button>
      </Link>
    </div>
  );
}

DrinkRecipeInProgress.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
};
