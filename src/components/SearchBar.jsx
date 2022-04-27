import React, { useState } from 'react';
import request from '../services/services';

export default function SearchBar() {
  const [endPoint, setEndPonit] = useState('');

  const onChange = ({ target: { value } }) => {
    console.log(value);
    setEndPonit((prevState) => ({
      ...prevState,
      value,
    }));
  };

  const searchClick = () => {
    const element = document.querySelector('input[name=search]:checked').value;

    if (element === 'ingredient') {
      return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${endPoint.value}`;
    }
    if (element === 'name') {
      return `https://www.themealdb.com/api/json/v1/1/search.php?s=${endPoint.value}`;
    }
    if (element === 'first-letter' && endPoint.value.length === 1) {
      return `https://www.themealdb.com/api/json/v1/1/search.php?f=${endPoint.value}`;
    }
    if (element === 'first-letter' && endPoint.value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };
  return (
    <form>
      <input
        data-testid="search-input"
        type="text"
        onChange={ onChange }

      />
      <label htmlFor="ingredient">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient"
          name="search"
          value="ingredient"
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name"
          name="search"
          value="name"
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
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => request(searchClick()) }
      >
        buscar

      </button>
    </form>
  );
}
