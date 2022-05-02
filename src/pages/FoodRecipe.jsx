import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import request from '../services/services';

const recipeDetailsEndpoint = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const recomendationDrinkRecipes = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export default function FoodRecipe({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState({});
  const [recomendation, setRecomendation] = useState({});

  useEffect(() => {
    request(recipeDetailsEndpoint + id).then((res) => {
      setRecipe(res.meals[0]);
    });
    request(recomendationDrinkRecipes).then((res) => {
      const MAX_LENGTH = 6;
      setRecomendation((res.drinks).slice(0, MAX_LENGTH));
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

  return (
    <div>
      <div>
        <img
          style={ { width: '400px' } } // remover se for estilzar com css
          data-testid="recipe-photo"
          src={ recipe.strMealThumb }
          alt="s"
        />
        <h3 data-testid="recipe-title">{ recipe.strMeal }</h3>
        <button data-testid="share-btn" type="button">Share</button>
        <button data-testid="favorite-btn" type="button">Favorite</button>
        <p data-testid="recipe-category">{ recipe.strCategory }</p>
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
      <div>
        <h2>Recommended</h2>
        <div style={ { height: '300px', display: 'flex', overflowY: 'hidden' } }>
          { recomendation.length > 0 && (
            recomendation.map((drink, index) => (
              <div
                key={ drink.idDrink }
                data-testid={ `${index}-recomendation-card` }
              >
                <img
                  style={ { width: '200px' } } // remover se for estilzar com css
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                />
                <p>{ drink.strCategory }</p>
                <h3 data-testid={ `${index}-recomendation-title` }>{ drink.strDrink }</h3>
              </div>
            )))}
        </div>
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
    </div>
  );
}

FoodRecipe.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
};
