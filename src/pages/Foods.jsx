import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import AppContext from '../context/AppContext';
import { FOOD_ENDPOINTS } from '../context/AppContextProvider';

export default function Foods() {
  const history = useHistory();
  const { setSearchEndpoints } = useContext(AppContext);
  useEffect(() => {
    setSearchEndpoints(FOOD_ENDPOINTS);
  }, [setSearchEndpoints]);

  const { searchResult } = useContext(AppContext);

  if (searchResult.meals && searchResult.meals.length === 1) {
    history.push(`/foods/${searchResult.meals[0].idMeal}`);
  }

  return (
    <div>
      <Header title="Foods" />
    </div>
  );
}
