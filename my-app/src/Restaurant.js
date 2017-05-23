import React, { Component } from 'react';
import logo from './logo.svg';
import Logo from './Logo';
import SearchBar from './SearchBar';

class App extends Component {
  render() {
    return (
      <div>
        <Logo />
        <SearchBar />
      </div>
    );
  }
}

export default App;
