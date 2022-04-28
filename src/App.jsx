import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import Recipe from './pages/Recipe';
import Done from './pages/Done';
import Favorite from './pages/Favorite';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreIngredient from './pages/ExploreIngredient';
import ExploreNationty from './pages/ExploreNationty';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/drinks/:id" component={ Recipe } />
        <Route exact path="/foods/:id" component={ Recipe } />
        <Route exact path="/done-recipes" component={ Done } />
        <Route exact path="/favorite-recipes" component={ Favorite } />
        <Route exact path="/explore/foods/ingredients" component={ ExploreIngredient } />
        <Route exact path="/explore/drinks/ingredients" component={ ExploreIngredient } />
        <Route exact path="/explore/foods/nationalities" component={ ExploreNationty } />
      </Switch>
    </div>
  );
}

export default App;
