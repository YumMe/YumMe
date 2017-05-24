import React, { Component } from 'react';
import logo from './logo.svg';

class SearchSquare extends Component {
  render() {
    return (
      // All of this still needs to be properly formatted 
      <div className="searchSquare">
        <img src ={this.props.image} />
        The venue id: {this.props.venueId}
      </div>
    );
  }
}

export default SearchSquare;
