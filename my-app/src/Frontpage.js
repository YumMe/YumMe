import React, { Component } from 'react';
import SearchBar from './SearchBar-b';

class App extends Component {
  render() {
    return (
      <div className="title homepage">
        <div className="text">
          <h1 className="title"> YumMe!</h1>
          <h2 className="light ">See what tastes good.</h2>
          <SearchBar />
        </div>
      </div>
    );
  }
}

export default App;
