import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Frontpage from './Frontpage';
import SearchResults from './SearchResults';
import Restaurant from './Restaurant';
import './style.css';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

ReactDOM.render(
  // <App />,
  // document.getElementById('root')
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Frontpage} />
      <Route path="search" component={SearchResults} />
      <Route path="restaurant" component={Restaurant} />
    </Route>
  </Router>,
  document.getElementById('root')
);