import React, { Component } from 'react';
import logo from './logo.svg';
import Logo from './Logo';
import SearchBar from './SearchBar';
import SearchResultsGrid from './SearchResultsGrid';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    var query = this.props.location.query;

    // Get restaurant ID (venue_id)
    if (query.venue_id !== undefined) {

      var imagesArray = [];
      var idArray = [];

      // Query restaurant from foursquare
      var currId = query.venue_id;
      fetch('https://api.foursquare.com/v2/venues/' + currId + '/photos?limit=1&client_id=N2POGB50IPO43FHUPOHRRJE0FWNDTV5DUCITOFVFWIXHBLUD&client_secret=JURFUE0WYS02ZFQJ0O132PIXOTBNJK1IDMQING34BNNNVYWL&v=20170622')
        .then(
        (response) => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
          response.json().then((data) => {
            console.log(data);
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

    } else {
      console.log('missing param: venue_id');
    }
  }


  render() {
    return (
      <div>
        <Logo />
        <SearchBar />
        <div>Memes</div>
        {this.state.venueImages !== undefined && this.state.venueIds !== undefined &&
          <SearchResultsGrid venueImages={this.state.venueImages} venueIds={this.state.venueIds} />
        }
      </div>
    );
  }
}

export default App;
