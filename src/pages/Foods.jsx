import React, { useContext } from 'react';

import Header from '../components/Header';
import AppContext from '../context/AppContext';
import { FOOD_ENDPOINTS } from '../context/AppContextProvider';

export default function Foods() {
  const { setSearchEndpoints } = useContext(AppContext);
  setSearchEndpoints(FOOD_ENDPOINTS);

  return (
    <div>
      <Header title="Foods" />
    </div>
  );
}
