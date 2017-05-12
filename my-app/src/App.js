import React, { Component } from 'react';
import SearchBar from './SearchBar';
//import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div className="title">
        YumMe!
        <SearchBar />
      </div>
    );
  }
}

export default App;
