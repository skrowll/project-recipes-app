import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import '../styles/pages/Foods-Drinks.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import AppContext from '../context/AppContext';
import { COCKTAIL_ENDPOINTS } from '../context/AppContextProvider';
import RecipesRecomended from '../components/RecipesRecomended';
import { request } from '../services/services';

const MAX_ITEMS = 12;

const searchEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const filterByCategoryEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export default function Drinks() {
  const history = useHistory();
  const { setSearchEndpoints, searchResult, search,
    selectedCategory } = useContext(AppContext);

  useEffect(() => {
    if (selectedCategory !== '') {
      request(`${filterByCategoryEndpoint}${selectedCategory}`).then((drinks) => {
        search(drinks);
      });
    } else {
      request(searchEndpoint).then((drinks) => {
        search(drinks);
      });
    }
    setSearchEndpoints(COCKTAIL_ENDPOINTS);
  }, [setSearchEndpoints, selectedCategory]);

  const to = '/drinks/';

  if (searchResult.drinks === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  if (searchResult.drinks && searchResult.drinks.length === 1
     && selectedCategory === '') {
    history.push(`${to}${searchResult.drinks[0].idDrink}`);
  }

  return (
    <div>
      <Header title="Drinks" showSearchIcon />
      <RecipesRecomended page="drink" />
      <div className="results-content">
        { searchResult.drinks?.slice(0, MAX_ITEMS).map(
          (each, index) => (
            <Link
              to={ to + each.idDrink }
              key={ each.idDrink }
            >
              <RecipeCard
                title={ each.strDrink }
                image={ each.strDrinkThumb }
                index={ index }
              />
            </Link>
          ),
        )}
      </div>
      <Footer />
    </div>
  );
}
