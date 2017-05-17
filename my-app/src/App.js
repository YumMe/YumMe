import React, { Component } from 'react';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';
//import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div className="title">
        YumMe!
        <SearchResults />
        <SearchBar />
      </div>
    );
  }
}

export default App;
