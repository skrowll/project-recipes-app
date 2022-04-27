import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import AppContext from '../context/AppContext';
import { COCKTAIL_ENDPOINTS } from '../context/AppContextProvider';

const MAX_ITEMS = 12;

export default function Drinks() {
  const history = useHistory();
  const { setSearchEndpoints } = useContext(AppContext);
  useEffect(() => {
    setSearchEndpoints(COCKTAIL_ENDPOINTS);
  }, [setSearchEndpoints]);

  const { searchResult } = useContext(AppContext);
  console.log(searchResult);
  if (searchResult.drinks && searchResult.drinks.length === 1) {
    history.push(`/drinks/${searchResult.drinks[0].idDrink}`);
  }

  return (
    <div>
      <Header title="Drinks" />
      { searchResult.drinks?.slice(0, MAX_ITEMS).map(
        (each, index) => (
          <RecipeCard
            key={ each.idDrink }
            title={ each.strDrink }
            image={ each.strDrinkThumb }
            index={ index }
          />
        ),
      )}
    </div>
  );
}
