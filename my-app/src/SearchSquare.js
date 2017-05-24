import React, { Component } from 'react';
//import logo from './logo.svg';

class SearchSquare extends Component {
  render() {
    return (
      <div className="search-square">
        <img className="search-image" src={this.props.image} alt={this.props.venueId} />
        {/*The venue id: {this.props.venueId}*/}
        <div className="overlay">
          <div className="overlay-text">{this.props.venueId}</div>
        </div>
      </div>
    );
  }
}

export default SearchSquare;
