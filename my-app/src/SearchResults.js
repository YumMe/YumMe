import React, { Component } from 'react';
//import logo from './logo.svg';
import SearchResultsGrid from './SearchResultsGrid';
import SearchBar from './SearchBar';
import Logo from './Logo';

class SearchResults extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: this.props.location,
      isCityString: this.props.isCityString,

      // city, lat, long, searchType
      city: '',
      lat: '',
      long: '',
      searchType: ''

    }
    this.queryParametersAreValid = this.queryParametersAreValid.bind(this);
  }


  componentDidMount() {

    // Get query parameters
    var query = this.props.location.query;

    // Either 'coords' or 'city'
    var searchType = null;

    // API call to make, bake on searchType and query parameters
    var foursquareApiCall = null;

    // For logging purposes: either the city name, or lat,long
    var param = '';

    // (1) If using current location (takes priority over city)
    if (query.lat !== undefined && query.long !== undefined) {
      if (this.queryParametersAreValid(query.lat, query.long)) {
        searchType = 'coords';

        // https://developer.foursquare.com/docs/venues/search
        var latAndLong = query.lat + ',' + query.long;

        param = latAndLong;

        foursquareApiCall = 'https://api.foursquare.com/v2/venues/search?ll='
          + latAndLong
          + '&intent=checkin&query=restaurant&limit=50&v=20170605&client_id=N2POGB50IPO43FHUPOHRRJE0FWNDTV5DUCITOFVFWIXHBLUD&client_secret=JURFUE0WYS02ZFQJ0O132PIXOTBNJK1IDMQING34BNNNVYWL';
      }
    }
    // (2) If using a specified city
    else if (query.city !== undefined) {
      if (query.city.length > 0) {
        searchType = 'city';

        param = query.city;

        foursquareApiCall = 'https://api.foursquare.com/v2/venues/search?near='
          + query.city
          + '&intent=browse&query=restaurant&limit=50&v=20170605&client_id=N2POGB50IPO43FHUPOHRRJE0FWNDTV5DUCITOFVFWIXHBLUD&client_secret=JURFUE0WYS02ZFQJ0O132PIXOTBNJK1IDMQING34BNNNVYWL';
      }
    }
    // (3) If invalid query parameters, default to city=Seattle, WA
    if (searchType === null) {
      console.log('invalid query parameters, defaulting to city=Seattle, WA');
      searchType = 'city';

      param = 'default location: Seattle, WA';

      foursquareApiCall = 'https://api.foursquare.com/v2/venues/search?near='
          + 'Seattle, WA'
          + '&intent=browse&query=restaurant&limit=50&v=20170605&client_id=N2POGB50IPO43FHUPOHRRJE0FWNDTV5DUCITOFVFWIXHBLUD&client_secret=JURFUE0WYS02ZFQJ0O132PIXOTBNJK1IDMQING34BNNNVYWL';
    }

    console.log(foursquareApiCall);

    // Grab venues
    fetch(foursquareApiCall)
      .then(
      (response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        response.json().then((data) => {
          // Grab images
          var venues = data["response"]["venues"];
          //console.log(JSON.stringify(venues));
          var imagesArray = [];
          var idArray = [];

          // If no results, then put a message up or something idk
          console.log(imagesArray.length);
          if (venues.length === 0) {
            switch (searchType) {
              case 'city':
                console.log("No results found for city: " + param);
                break;
              case 'coords':
                console.log("No results found for coords: " + param);
                break;
              default:
                console.log("invalid search parameters");
                break;
            }
          }


          for (var i = 0; i < venues.length; i++) {
            let currId = venues[i]["id"];
            //console.log(currId);
            fetch('https://api.foursquare.com/v2/venues/' + currId + '/photos?limit=1&client_id=N2POGB50IPO43FHUPOHRRJE0FWNDTV5DUCITOFVFWIXHBLUD&client_secret=JURFUE0WYS02ZFQJ0O132PIXOTBNJK1IDMQING34BNNNVYWL&v=20170622')
              .then(
              (response) => {
                if (response.status !== 200) {
                  console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                  return;
                }
                response.json().then((data) => {
                  //console.log(JSON.stringify(data));
                  if (data["response"]["photos"]["items"][0] !== undefined) {
                    var venueImage = data["response"]["photos"]["items"][0]["prefix"] + "300x300" + data["response"]["photos"]["items"][0]["suffix"];
                    imagesArray.push(venueImage);
                    //console.log(currId);
                    idArray.push(currId);
                    this.setState({ venueImages: imagesArray, venueIds: idArray });
                  }
                });
              }
              )
              .catch(function (err) {
                console.log('Fetch Error :-S', err);
              })
          }
        });
      }
      )
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
  }

  // Validates query parameters
  queryParametersAreValid(lat, long) {

    // If there is a city
    // Latitude should be a number
    if (lat !== undefined) {
      if (long === undefined) {
        // If there is a lat, there must be a long, so this is wrong
        console.log('missing longitude parameter');
        return false;
      }
    }

    // Lat and long must be floats
    var isFloat = new RegExp('^[-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$');

    var validLat = isFloat.test(lat);
    var validLong = isFloat.test(long);

    console.log(lat);
    console.log(long);

    // If both lat and long are only numbers
    if (validLat && validLong) {
      return true;
    }
    console.log('lat or long is invalid');
    return false;
  }


  render() {
    return (
      <div>
        <Logo />
        <SearchBar />
        {this.state.venueImages !== undefined && this.state.venueIds !== undefined &&
          <SearchResultsGrid venueImages={this.state.venueImages} venueIds={this.state.venueIds} />
        }
      </div>
    );
  }
}

export default SearchResults;