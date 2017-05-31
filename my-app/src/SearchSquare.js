import React, { Component } from 'react';
//import logo from './logo.svg';
import { hashHistory } from 'react-router';



class SearchSquare extends Component {

  constructor(props) {
    super(props);
    
    this.goToRestaurantPage = this.goToRestaurantPage.bind(this);
  }


  goToRestaurantPage() {
    if (this.props.venueId !== undefined) {
      hashHistory.push('/restaurant?venue_id=' + this.props.venueId);
    }
  }

  render() {
    return (
      <div className="search-square">
        <img className="search-image" src={this.props.image} alt={this.props.venueId} />
        {/*The venue id: {this.props.venueId}*/}
        <div className="overlay">
          <div className="overlay-text">
            <div>{this.props.venueName}</div>
            <div onClick={this.goToRestaurantPage}>{this.props.venueId}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchSquare;
