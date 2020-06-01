import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../src/styles/global.scss';

import Board from './pages/Board';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import User from './pages/User';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/board/:id" component={Board} exact />
        <Route path="/user/:id" component={User} exact />
        <Route path="" component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;