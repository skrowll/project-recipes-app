import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explore() {
  return (
    <div>
      <Header title="Explore" />
      <Link to="/explore/foods">
        <button data-testid="explore-foods" type="button">
          Explore Foods
        </button>
      </Link>
      <Link to="/explore/drinks">
        <button data-testid="explore-drinks" type="button">
          Explore Drinks
        </button>
      </Link>
      <Footer />
    </div>
  );
}
