import React, { Component } from 'react';
import SearchResults from './SearchResults';
//import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div className="title">
        YumMe!
        <SearchResults />
      </div>
    );
  }
}

export default App;
