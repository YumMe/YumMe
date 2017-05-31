import React, { Component } from 'react';

// import SearchBar from './SearchBar'; uneeded now
//import Frontpage from './Frontpage';

//import SearchResults from './SearchResults';
//import SearchBar from './SearchBar';

//import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div >
      <div>{this.props.children}</div>
        {/*<Frontpage/>
        <div className="title">
          YumMe!
          <SearchResults />
          <SearchBar />

        </div>
        */}
      </div>
    );
  }
}

export default App;
