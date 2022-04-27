import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export const FOOD_ENDPOINTS = {
  ingredientEndpoint: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
  nameEndpoint: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  firstLetterEndpoint: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
};

export const COCKTAIL_ENDPOINTS = {
  ingredientEndpoint: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
  nameEndpoint: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  firstLetterEndpoint: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
};

export default function AppContextProvider({ children }) {
  const [searchEndpoints, setSearchEndpoints] = useState(FOOD_ENDPOINTS);
  const [searchResult, setSearchResult] = useState({});

  const search = (data) => {
    setSearchResult(data);
  };

  const contextValue = {
    searchEndpoints,
    setSearchEndpoints,
    searchResult,
    search,
  };
  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

AppContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
