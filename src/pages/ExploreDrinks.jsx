import React from 'react';
import FilterExplore from '../components/FilterExplore';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreDrinks() {
  return (
    <div>
      <Header title="Explore Drinks" />
      <FilterExplore
        renderButton={ false }
        routeIngredientes="/explore/drinks/ingredients"
        page="drink"
      />
      <Footer />
    </div>
  );
}
