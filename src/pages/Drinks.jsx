import React, { useContext, useEffect } from 'react';

import Header from '../components/Header';
import AppContext from '../context/AppContext';
import { COCKTAIL_ENDPOINTS } from '../context/AppContextProvider';

export default function Drinks() {
  const { setSearchEndpoints } = useContext(AppContext);
  useEffect(() => {
    setSearchEndpoints(COCKTAIL_ENDPOINTS);
    console.log('teste');
  }, [setSearchEndpoints]);

  return (
    <div>
      <Header title="Drinks" />
    </div>
  );
}
