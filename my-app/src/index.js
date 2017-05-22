import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Frontpage from './Frontpage';
import SearchResults from './SearchResults';
import Restaurant from './Restaurant';
import './style.css';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

ReactDOM.render(
  // <App />,
  // document.getElementById('root')
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Frontpage} />
      <Route path="searchresults" component={SearchResults} />
      <Route path="restaurant" component={Restaurant} />
    </Route>
  </Router>,
  document.getElementById('root')
);