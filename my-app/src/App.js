import React, { Component } from 'react';
import SearchBar from './SearchBar';
//import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="title homepage">
          YumMe!
        <h2 className="light homepage">See what tastes good</h2>
          <SearchBar />
        </div>
      </div>
    );
  }
}

export default App;
