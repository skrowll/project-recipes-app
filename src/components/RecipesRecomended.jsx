import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import '../styles/components/RecipesRecomended.css';
import request from '../services/services';

const urlFood = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const MAX_ITEMS = 5;

function RecipesRecomended({ search }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (search === 'food') {
      // pesquisa por food
      request(urlFood).then(({ meals }) => setResults(meals.slice(0, MAX_ITEMS)));
    } else {
      // pesquisa por drink
      request(urlDrink).then(({ drinks }) => setResults(drinks.slice(0, MAX_ITEMS)));
    }
  }, [search]);

  useEffect(() => {
    console.log(results);
  }, [results]);

  return (
    <div className="recomended-content">
      { results.map((each, i) => (
        <button data-testid={ `${search}-category-filter` } key={ i } type="button">
          { each.strCategory }
        </button>
      ))}
    </div>
  );
}

RecipesRecomended.propTypes = {
  search: PropTypes.string.isRequired,
};

export default RecipesRecomended;
