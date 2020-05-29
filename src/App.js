import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../src/styles/global.scss';

import Board from './pages/Board';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import User from './pages/User';

// import LoadPage from './cmps/LoadPage';

// const Board = React.lazy(() => import('./pages/Board'));

// import StatusBar from './cmps/StatusBar';

function App() {
  return (
    <Router>
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

// function App() {
//   return (
//     <Suspense fallback={<LoadPage />}>
//       <Router>
//         {/* <StatusBar /> */}
//         <Switch>
//           <Route path="/" component={Home} exact />
//           <Route path="/board/:id" component={Board} exact />
//           <Route path="/user/:url_id" component={User} exact />
//           <Route path="" component={PageNotFound} />
//         </Switch>
//       </Router>
//     </Suspense>
//   );
// }