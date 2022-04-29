import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import '../styles/components/RecipesRecomended.css';
import request from '../services/services';
import AppContext from '../context/AppContext';

const urlFood = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const MAX_ITEMS = 5;

function RecipesRecomended({ page }) {
  const [results, setResults] = useState([]);
  const { selectedCategory, setSelectedCategory } = useContext(AppContext);

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category);
    }
  };

  useEffect(() => {
    if (page === 'food') {
      // pesquisa por food
      request(urlFood).then(({ meals }) => setResults(meals.slice(0, MAX_ITEMS)));
    } else {
      // pesquisa por drink
      request(urlDrink).then(({ drinks }) => setResults(drinks.slice(0, MAX_ITEMS)));
    }
  }, [page]);

  return (
    <div className="recomended-content">
      <button
        className={ `${selectedCategory === ''
          ? 'selectedCategory'
          : 'category'}` }
        data-testid="All-category-filter"
        type="button"
        onClick={ () => handleCategoryClick('') }
      >
        All
      </button>
      { results.map((each, i) => (
        <button
          className={ `${selectedCategory === each.strCategory
            ? 'selectedCategory'
            : 'category'}` }
          data-testid={ `${each.strCategory}-category-filter` }
          key={ i }
          type="button"
          onClick={ () => handleCategoryClick(each.strCategory) }
        >
          { each.strCategory }
        </button>
      ))}
    </div>
  );
}

RecipesRecomended.propTypes = {
  page: PropTypes.string.isRequired,
};

export default RecipesRecomended;
