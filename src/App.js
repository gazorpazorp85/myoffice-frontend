import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../src/styles/global.scss';

import Home from './pages/Home';
import Board from './pages/Board';

import StatusBar from './cmps/StatusBar';

function App() {
  return (
    <Router>
      <StatusBar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/board/:id" component={Board} exact />
      </Switch>
    </Router>
  );
}

export default App;
