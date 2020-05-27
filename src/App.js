import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../src/styles/global.scss';

import Board from './pages/Board';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import User from './pages/User';

// import StatusBar from './cmps/StatusBar';

function App() {
  return (
    <Router>
      {/* <StatusBar /> */}
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/board/:id" component={Board} exact />
        <Route path="/user/:url_id" component={User} exact />
        <Route path="" component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
