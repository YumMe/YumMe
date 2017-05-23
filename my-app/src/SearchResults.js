import React, { Component } from 'react';
import logo from './logo.svg';
import SearchResultsGrid from './SearchResultsGrid';
import SearchBar from './SearchBar';

class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: this.props.location,
            isCityString: this.props.isCityString
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        // Grab venues
        fetch('https://api.foursquare.com/v2/venues/search?near=Seattle,WA&query=restaurant&limit=50&v=20170605&client_id=N2POGB50IPO43FHUPOHRRJE0FWNDTV5DUCITOFVFWIXHBLUD&client_secret=JURFUE0WYS02ZFQJ0O132PIXOTBNJK1IDMQING34BNNNVYWL')
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
                    for (var i = 0; i < venues.length; i ++) {
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
                                    if (data["response"]["photos"]["items"][0] != undefined){
                                        var venueImage = data["response"]["photos"]["items"][0]["prefix"] + "300x300" + data["response"]["photos"]["items"][0]["suffix"];
                                        imagesArray.push(venueImage);
                                        //console.log(currId);
                                        idArray.push(currId);
                                        this.setState({venueImages: imagesArray, venueIds: idArray});
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
        return (
            <div>
                <div className="title">
                    YumMe!
                </div>
                <SearchBar />
                {this.state.venueImages != undefined && this.state.venueIds !=undefined &&
                    <SearchResultsGrid venueImages={this.state.venueImages} venueIds={this.state.venueIds} />
                }
            </div>
        );
    }
}

export default SearchResults;
