import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import '../styles/pages/Foods-Drinks.css';
import { FOOD_ENDPOINTS } from '../context/AppContextProvider';
import AppContext from '../context/AppContext';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import RecipesRecomended from '../components/RecipesRecomended';
import request from '../services/services';

const MAX_ITEMS = 12;

const searchFoodEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const filterByCategoryEndpoint = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

export default function Foods() {
  const history = useHistory();
  const { setSearchEndpoints, searchResult, search,
    selectedCategory } = useContext(AppContext);

  useEffect(() => {
    if (selectedCategory !== '') {
      request(`${filterByCategoryEndpoint}${selectedCategory}`).then((drinks) => {
        search(drinks);
      });
    } else {
      request(searchFoodEndpoint).then((meals) => {
        search(meals);
      });
    }
    setSearchEndpoints(FOOD_ENDPOINTS);
  }, [setSearchEndpoints, selectedCategory]);

  if (searchResult.meals === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  const to = '/foods/';

  if (searchResult.meals && searchResult.meals.length === 1 && selectedCategory === '') {
    history.push(`${to}${searchResult.meals[0].idMeal}`);
  }

  return (
    <div>
      <Header title="Foods" showSearchIcon />
      <RecipesRecomended page="food" />
      <div className="results-content">
        { searchResult.meals?.slice(0, MAX_ITEMS).map(
          (each, index) => (
            <Link
              to={ to + each.idMeal }
              key={ each.idMeal }
            >
              <RecipeCard
                title={ each.strMeal }
                image={ each.strMealThumb }
                index={ index }
              />
            </Link>),
        )}
      </div>
      <Footer />
    </div>
  );
}
