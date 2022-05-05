import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

import { request } from '../services/services';

const LINK_FOOD = 'https://www.themealdb.com/api/json/v1/1/random.php';
const LINK_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

export default function FilterExplore({ renderButton, routeIngredientes, page }) {
  const history = useHistory();

  // randomfood recebe um link, que pode ser o de food ou de drink, que é decidido
  // pela função verification logo abaixo, e redireciona o usuario pra uma página com
  // uma receita aleatória usando o history.push.
  const randomFood = async (link) => {
    const adress = await request(link);
    if (page === 'food') {
      return history.push(`/foods/${adress.meals[0].idMeal}`);
    }
    return history.push(`/drinks/${adress.drinks[0].idDrink}`);
  };

  const verification = () => {
    if (page === 'food') return LINK_FOOD;
    return LINK_DRINK;
  };

  return (
    <div>
      <Link to={ routeIngredientes }>
        <button type="button" data-testid="explore-by-ingredient">By Ingredient</button>
      </Link>
      {renderButton
      && (
        <Link to="/explore/foods/nationalities">
          <button
            type="button"
            data-testid="explore-by-nationality"
          >
            By Nationality
          </button>
        </Link>
      )}
      <button
        onClick={ () => randomFood(verification()) }
        type="button"
        data-testid="explore-surprise"
      >
        Surprise me!
      </button>
    </div>
  );
}

FilterExplore.propTypes = {
  renderButton: PropTypes.bool,
  routeIngredientes: PropTypes.string,
  page: PropTypes.string,
}.isRequired;
