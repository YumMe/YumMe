import React, { Component } from 'react';
import SearchBar from './SearchBar';
//import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div className="title">
        YumMe!
        <h2 className="light">See what tastes good</h2>
        <SearchBar />
      </div>
    );
  }
}

export default App;
