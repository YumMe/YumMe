import React, { Component } from 'react';
import logo from './logo.svg';


class SearchResults extends Component {

  constructor(props) {
    super(props);
    this.componentDidlMount();
    this.queryParametersAreValid = this.queryParametersAreValid.bind(this);
  }

  componentDidlMount() {
    var data = "client_id=-TEl59_tdP6IVt5oFziseA&client_secret=UiRibnj9ucjfMQU54nNc0IF3Ad2CqW8m7L7XXq3nfZhgbPpzoLJw1XslfRPpWUFH&grant_type=client_credentials";

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("GET", "https://api.yelp.com/v3/businesses/search?term=Meesum&location=seattle%2C%20wa");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("authorization", "Bearer mFx9GawCOq_cHnJvJ03aPdCGXyZMQCluSNVVFJ6Exb9nftJaIUTyXiukKT19_86n3P13wV_lbaNOyxUhoyXspWEWPeJ-8YjKIzDzHp9yPaY3zb2IAHs5f5adRl8WWXYx");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "13dc087b-69b6-539d-241b-9f0c12423a19");

    xhr.send(data);
  }


  // Validates query parameters (optional, add this if necessary)
  queryParametersAreValid(lat, long) {

    // If there is a city
    // Latitude should be a number
    if (lat !== undefined) {
      if (long === undefined) {
        // If there is a lat, there must be a long, so this is wrong
        return false;
      }
    }

    var isNumbers = new RegExp('/^\d+$/');

    var validLat = lat.match(isNumbers) && lat.length > 0;
    var validLong = long.match(isNumbers) && lat.length > 0;

    // If both lat and long are only numbers
    if (validLat && validLong) {
      return true;
    }
    return false;
  }


  render() {

    console.log('memes');
    console.log(this.props.location.query);

    var query = this.props.location.query;


    var valid = true;

    var searchType = ''; // 'coords' or 'city'

    if (query !== undefined) {

      

      // 1) Latitude and longitude, takes priority (current position)
      if (query.lat !== undefined && query.long !== undefined) {
        console.log('Latitude: ' + query.lat);
        console.log('Longitude: ' + query.long);

        // Validate long, lat
        if (!this.queryParametersAreValid(query.lat, query.long)) {
          valid = false;
        } else {
          searchType = 'coords';
        }
      }

      // 2) OR Specified city
      else if (query.city !== undefined) {
        console.log('City: ' + query.city);
        searchType = 'city';
      }
      // 3) OR errors in query parameters
      else {
        console.log('invalid or missing query parameters');
        valid = false;
      }
    }

    var queryInfoDiv = (<div></div>);

    if (valid) {
      if (searchType === 'city') {
        queryInfoDiv = (
          <div>{this.props.location.query.city}</div>
        );
      } else if (searchType === 'coords') {
        queryInfoDiv = (
          <div>
            <div>{this.props.location.query.lat}</div>
            <div>{this.props.location.query.long}</div>
          </div>
        );
      }
    }
    // Default: current location

    return (
      <div className="title">
        YumMe! This is the search results page
        {queryInfoDiv}
      </div>
    );
  }
}

export default SearchResults;
