import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import request from '../services/services';

export default function SearchBar() {
  const [state, setState] = useState({
    inputSearch: '',
    search: 'name',
  });

  const { searchEndpoints:
    {
      ingredientEndpoint,
      nameEndpoint,
      firstLetterEndpoint,
    },
  search,
  } = useContext(AppContext);

  const onChange = ({ target: { name, value } }) => {
    if (name === 'inputSearch' && value.length > 1 && state.search === 'first-letter') {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getEndpoint = () => {
    if (state.search === 'ingredient') {
      return `${ingredientEndpoint}${state.inputSearch}`;
    }
    if (state.search === 'name') {
      return `${nameEndpoint}${state.inputSearch}`;
    }
    if (state.search === 'first-letter') {
      if (state.inputSearch.length > 1) {
        setState((prevState) => ({
          ...prevState,
          inputSearch: prevState.inputSearch[0],
        }));
      }
      return `${firstLetterEndpoint}${state.inputSearch[0]}`;
    }
  };

  return (
    <form>
      <input
        data-testid="search-input"
        type="text"
        name="inputSearch"
        value={ state.inputSearch }
        onChange={ onChange }
      />
      <label htmlFor="ingredient">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient"
          name="search"
          value="ingredient"
          onChange={ onChange }
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name"
          checked
          name="search"
          value="name"
          onChange={ onChange }
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter"
          name="search"
          value="first-letter"
          onChange={ onChange }
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ async () => {
          const data = await request(getEndpoint());
          search(data);
        } }
      >
        buscar

      </button>
    </form>
  );
}
