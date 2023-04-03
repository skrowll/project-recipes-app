import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import '../styles/pages/Recipe.css';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { isFavorite, removeFavorite, request, saveFavorite } from '../services/services';
import Header from '../components/Header';
// import Footer from '../components/Footer';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

export const recipeDetailsEndpoint = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const recomendationDrinkRecipes = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export default function FoodRecipe({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState({});
  const [recomendation, setRecomendation] = useState({});
  const [startRecipe, setStartRecipe] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    request(recipeDetailsEndpoint + id).then((res) => {
      setRecipe(res.meals[0]);
    });
    request(recomendationDrinkRecipes).then((res) => {
      const MAX_LENGTH = 6;
      setRecomendation((res.drinks).slice(0, MAX_LENGTH));
    });
    const ingredientLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!ingredientLocalStorage) {
      setStartRecipe(true);
    }
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
  const copy = () => {
    clipboardCopy(window.location.href);
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
      <Header title="Recipe" />
      <div className="recipeContainer">
        <div className="imageContainer">
          <img
            // style={ { width: '400px' } } // remover se for estilzar com css
            data-testid="recipe-photo"
            className="recipeImage"
            src={ recipe.strMealThumb }
            alt="s"
          />
        </div>
        <h3 className="recipeName" data-testid="recipe-title">{ recipe.strMeal }</h3>
        <p data-testid="recipe-category">{ `Category: ${recipe.strCategory}` }</p>
        <div className="socialContainer">
          {linkCopied && <p>Link copied!</p>}
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
        <ol>
          Ingredients:
          {
            getIngredients().map((ingredient, index) => (
              <li
                key={ ingredient }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient} - ${getMeasures()[index]}`}
              </li>))
          }
        </ol>
        <br />
        <p data-testid="instructions">{recipe.strInstructions}</p>
        <iframe
          data-testid="video"
          title="tutorial"
          src={ recipe.strYoutube?.replace('watch?v=', 'embed/') }
          frameBorder="0"
          allowFullScreen
        />
        {/* <Footer /> */}
      </div>
      <h2>Recommended drinks</h2>
      <div className="recommendedContainer">
        { recomendation.length > 0 && (
          recomendation.map((drink, index) => (
            <Link
              to={ `/drinks/${drink.idDrink}` }
              key={ drink.idDrink }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                // style={ { width: '200px' } } // remover se for estilzar com css
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <div className="textContainer">
                <p>{ drink.strCategory }</p>
                <h3 data-testid={ `${index}-recomendation-title` }>{ drink.strDrink }</h3>
              </div>
            </Link>
          )))}
      </div>
      <Link
        to={ `/foods/${recipe.idMeal}/in-progress` }
        className="startRecipe"
        data-testid="start-recipe-btn"
      >
        { startRecipe ? 'Start Recipe' : 'Continue Recipe' }
      </Link>
    </div>
  );
}

FoodRecipe.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
};
