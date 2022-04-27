import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import AppContext from '../context/AppContext';
import RecipeCard from '../components/RecipeCard';
import { FOOD_ENDPOINTS } from '../context/AppContextProvider';

const MAX_ITEMS = 12;

export default function Foods() {
  const history = useHistory();
  const { setSearchEndpoints, searchResult } = useContext(AppContext);

  useEffect(() => {
    setSearchEndpoints(FOOD_ENDPOINTS);
  }, [setSearchEndpoints]);

  console.log(searchResult.meals);

  if (searchResult.meals && searchResult.meals.length === 1) {
    history.push(`/foods/${searchResult.meals[0].idMeal}`);
  }

  return (
    <div>
      <Header title="Foods" />
      { searchResult.meals?.slice(0, MAX_ITEMS).map(
        (each, index) => (
          <RecipeCard
            key={ each.idMeal }
            title={ each.strMeal }
            image={ each.strMealThumb }
            index={ index }
          />
        ),
      )}
    </div>
  );
}
