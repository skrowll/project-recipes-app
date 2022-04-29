import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import '../styles/pages/Foods-Drinks.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import AppContext from '../context/AppContext';
import { COCKTAIL_ENDPOINTS } from '../context/AppContextProvider';
import RecipesRecomended from '../components/RecipesRecomended';

const MAX_ITEMS = 12;

export default function Drinks() {
  const history = useHistory();
  const { setSearchEndpoints, searchResult } = useContext(AppContext);

  useEffect(() => {
    setSearchEndpoints(COCKTAIL_ENDPOINTS);
  }, [setSearchEndpoints]);

  if (searchResult.drinks === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  console.log(searchResult);
  if (searchResult.drinks && searchResult.drinks.length === 1) {
    history.push(`/drinks/${searchResult.drinks[0].idDrink}`);
  }

  return (
    <div>
      <Header title="Drinks" />
      <RecipesRecomended search="drink" />
      <div className="results-content">
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
      <Footer />
    </div>
  );
}
