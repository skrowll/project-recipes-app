import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import request from '../services/services';

import '../styles/pages/DrinkRecipe.css';

const recipeDetailsEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const recomendationMealRecipes = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export default function DrinkRecipe({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState({});
  const [recomendation, setRecomendation] = useState({});

  useEffect(() => {
    request(recipeDetailsEndpoint + id).then((res) => {
      setRecipe(res.drinks[0]);
    });
    request(recomendationMealRecipes).then((res) => {
      const MAX_LENGTH = 6;
      setRecomendation((res.meals).slice(0, MAX_LENGTH));
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

  const cardRecomendation = () => {
    if (recomendation.length > 0) {
      return (
        recomendation.map((meal, index) => (
          <div
            key={ meal.idMeal }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              style={ { width: '200px' } } // remover se for estilzar com css
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
            <p>{ meal.strCategory }</p>
            <h3 data-testid={ `${index}-recomendation-title` }>{ meal.strMeal }</h3>
          </div>
        )));
    }
  };

  return (
    <div>
      <div>
        <img
          style={ { width: '400px' } } // remover se for estilzar com css
          data-testid="recipe-photo"
          src={ recipe.strDrinkThumb }
          alt="s"
        />
        <h3 data-testid="recipe-title">{ recipe.strDrink }</h3>
        <button data-testid="share-btn" type="button">Share</button>
        <button data-testid="favorite-btn" type="button">Favorite</button>
        <p data-testid="recipe-category">{ recipe.strAlcoholic }</p>
        <ul>
          {
            getIngredients().map((ingredient, index) => (
              <li
                key={ ingredient }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient} - ${getMeasures()[index]}`}
              </li>))
          }
        </ul>
        <br />
        <p data-testid="instructions">{recipe.strInstructions}</p>
        {recipe.strVideo ? (<iframe
          data-testid="video"
          title="tutorial"
          width="560"
          height="315"
          src={ recipe.strVideo?.replace('watch?v=', 'embed/') }
          frameBorder="0"
          allowFullScreen
        />) : ''}
      </div>
      <div>
        <h2>Recommended</h2>
        <div style={ { height: '300px', display: 'flex', overflowY: 'hidden' } }>
          {
            cardRecomendation()
          }

        </div>
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe"
      >
        Start Recipe
      </button>
    </div>
  );
}

DrinkRecipe.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
};
