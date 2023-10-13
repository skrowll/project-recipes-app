import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Done from './pages/Done';
import DrinkRecipe from './pages/DrinkRecipe';
import DrinkRecipeInProgress from './pages/DrinkRecipeInProgress';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoods from './pages/ExploreFoods';
import ExploreIngredient from './pages/ExploreIngredient';
import ExploreNationty from './pages/ExploreNationty';
import Favorite from './pages/Favorite';
import FoodRecipe from './pages/FoodRecipe';
import FoodRecipeInProgress from './pages/FoodRecipeInProgress';
import Foods from './pages/Foods';
import Profile from './pages/Profile';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/foods" />
        </Route>
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/drinks/:id" component={ DrinkRecipe } />
        <Route exact path="/foods/:id" component={ FoodRecipe } />
        <Route exact path="/done-recipes" component={ Done } />
        <Route exact path="/favorite-recipes" component={ Favorite } />
        <Route exact path="/explore/foods/ingredients" component={ ExploreIngredient } />
        <Route exact path="/explore/drinks/ingredients" component={ ExploreIngredient } />
        <Route exact path="/explore/foods/nationalities" component={ ExploreNationty } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinkRecipeInProgress } />
        <Route exact path="/foods/:id/in-progress" component={ FoodRecipeInProgress } />
      </Switch>
    </div>
  );
}

export default App;
