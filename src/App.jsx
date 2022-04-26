import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Login from './pages/Login';
import Foods from './pages/Foods';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
      </Switch>
    </div>
  );
}

export default App;
