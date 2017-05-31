import React, { Component } from 'react';
//import logo from './logo.svg';
import Logo from './Logo';
import SearchBar from './SearchBar';
import SearchResultsGrid from './SearchResultsGrid';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false // not done making API call yet
    }
  }

  componentDidMount() {
    var query = this.props.location.query;

    // Get restaurant ID (venue_id)
    if (query.venue_id !== undefined) {

      // example endpoint:
      // https://api.foursquare.com/v2/venues/49ed594df964a520e3671fe3?client_id=N2POGB50IPO43FHUPOHRRJE0FWNDTV5DUCITOFVFWIXHBLUD&client_secret=JURFUE0WYS02ZFQJ0O132PIXOTBNJK1IDMQING34BNNNVYWL&v=20170622

      //var imagesArray = [];
      //var idArray = [];

      // Query restaurant from foursquare
      var currId = query.venue_id;

      this.setState({venue_id: currId});

      // Fetch restaurant
      fetch('https://api.foursquare.com/v2/venues/' + currId + '?client_id=N2POGB50IPO43FHUPOHRRJE0FWNDTV5DUCITOFVFWIXHBLUD&client_secret=JURFUE0WYS02ZFQJ0O132PIXOTBNJK1IDMQING34BNNNVYWL&v=20170622')
        .then(
        (response) => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          // Example endpoint: 
          response.json().then((data) => {
            //console.log(JSON.stringify(data));
            if (data["response"] !== undefined) {//["photos"]["items"][0] !== undefined) {
              
              // Get information from the returned
              if (data["response"]["venue"] !== undefined) {

                var venue = data['response']['venue'];
                
                var fs_id;
                var fs_name;
                var fs_rating;
                var fs_ratingColor;
                var fs_ratingSignals;
                var fs_address;
                var fs_crossStreet;
                var fs_lat;
                var fs_long;
                var fs_phone;
                var fs_hours;
                var fs_days;
                var fs_isOpen;
                var fs_url;
                var fs_foursquarePageUrl;
                var fs_mainImage;
                var fs_additionalPhotos;

                //_____________________
                // Restaurant information
                if (venue['id'] !== undefined) {
                  fs_id = venue['id'];
                }
                
                if (venue['name'] !== undefined) {
                  fs_name = venue['name'];
                }

                //_____________________
                //  foursquare number rating
                if (venue['rating'] !== undefined) {
                  fs_rating = venue['rating'];
                }

                if (venue['ratingColor'] !== undefined) {
                  fs_ratingColor = venue['ratingColor'];
                }
                if (venue['ratingSignals'] !== undefined) {
                  fs_ratingSignals = venue['ratingSignals'];
                }

                //  restaurant address
                if (venue['location'] !== undefined) {
                  if (venue['location']['address'] !== undefined) {
                    fs_address = venue['location']['address'];
                  }
                  if (venue['location']['crossStreet'] !== undefined) {
                    fs_crossStreet = venue['location']['crossStreet'];
                  }
                }

                //  map preview (could also use the address for the google maps thingy i guess)
                if (venue['location'] !== undefined) {
                  if (venue['location']['lat'] !== undefined) {
                    fs_lat = venue['location']['lat'];
                  }
                  if (venue['location']['lng'] !== undefined) {
                    fs_long = venue['location']['lng'];
                  }
                }

                //  restaurant phone number
                if (venue['contact'] !== undefined) {
                  if (venue['contact']['formattedPhone'] !== undefined) {
                    fs_phone = venue['contact']['formattedPhone'];
                  }
                }

                //  hours of operation
                if (venue['hours'] !== undefined) {
                  if (venue['hours']['timeframes'][0] !== undefined) {
                    if (venue['hours']['timeframes'][0]['open'] !== undefined) {
                      fs_hours = venue['hours']['timeframes'][0]['open'];//['renderedTime'];
                    }
                    if (venue['hours']['timeframes'][0]['days'] !== undefined) {
                      fs_days = venue['hours']['timeframes'][0]['days'];
                    }
                  }
                  if (venue['hours']['isOpen'] !== undefined) {
                    fs_isOpen = venue['hours']['isOpen'];
                  }
                }

                //  website if available
                fs_url = venue['url'];

                // foursquare page for the restaurant
                fs_foursquarePageUrl = venue['canonicalUrl'];

                // The image from before (search results page)
                fs_mainImage = '';

                //  2 additional photos
                fs_additionalPhotos = [];

                var maxPhotoCount = 2;
                var photos = [];
                
                if (venue['photos']['groups'][0]['items'] !== undefined) {
                  photos = venue['photos']['groups'][0]['items'];
                }

                console.log(venue['photos']['groups'][0]['items']);

                for (var i = 0; i < photos.length; i++) {
                  if (i === 0) {
                    fs_mainImage = (photos[i]['prefix'] + photos[i]['suffix']);
                  }
                  else if (fs_additionalPhotos.length < maxPhotoCount) {
                    fs_additionalPhotos.push(photos[i]['prefix'] + photos[i]['suffix']);
                  } else {
                    break;
                  }
                }
                // print stuff to test
                console.log(fs_id);
                console.log(fs_name);
                console.log(fs_mainImage);
                console.log(fs_rating);
                console.log(fs_ratingColor);
                console.log(fs_ratingSignals);
                console.log(fs_address);
                console.log(fs_crossStreet);
                console.log(fs_lat);
                console.log(fs_long);
                console.log(fs_phone);
                console.log(fs_hours);
                console.log(fs_days);
                console.log(fs_isOpen);
                console.log(fs_url);
                console.log(fs_foursquarePageUrl);
                console.log(fs_additionalPhotos);

                this.setState({
                  fs_id: fs_id,
                  fs_name: fs_name,
                  fs_mainImage: fs_mainImage,
                  fs_rating: fs_rating,
                  fs_ratingColor: fs_ratingColor,
                  fs_ratingSignals: fs_ratingSignals,
                  fs_address: fs_address,
                  fs_crossStreet: fs_crossStreet,
                  fs_lat: fs_lat,
                  fs_long: fs_long,
                  fs_phone: fs_hours,
                  fs_days: fs_isOpen,
                  fs_url: fs_url,
                  fs_foursquarePageUrl: fs_foursquarePageUrl,
                  fs_additionalPhotos: fs_additionalPhotos,

                  loaded: true
                });

                // may need to convert photos to format: https://igx.4sqi.net/img/general/300x300/761900_L2J3Uc1XzzRux8Gxn09zxRFBE803uyKnf_DwvkU1lVQ.jpg



                // end printing stuff

              }
              // var venueImage = data["response"]["photos"]["items"][0]["prefix"] + "300x300" + data["response"]["photos"]["items"][0]["suffix"];
              // imagesArray.push(venueImage);
              // //console.log(currId);
              // idArray.push(currId);
              // this.setState({ venueImages: imagesArray, venueIds: idArray });
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

    var customColor = '';

    if (this.state.loaded === true) {
      customColor = "#" + this.state.fs_ratingColor;
    }
    console.log('CC: ' + customColor);

    return (
      <div>
        <Logo />
        <SearchBar />
        {this.state.venueImages !== undefined && this.state.venueIds !== undefined &&
          <SearchResultsGrid venueImages={this.state.venueImages} venueIds={this.state.venueIds} />
        }

        {this.state.loaded === true &&
          <div>
            <div>{this.state.fs_name}</div>
            <div style={{color: customColor}}>Stars: {this.state.fs_rating}</div>
            <div>{this.state.fs_url}</div>
            <button className="btn">BACK</button>
          </div>
        }
      </div>
    );
  }
}

export default App;
