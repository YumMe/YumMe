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
                
                var fs_id = "not available";
                var fs_name = "not available";
                var fs_rating = "not available";
                var fs_ratingColor = "not available";
                var fs_ratingSignals = "not available";
                var fs_address = "not available";
                var fs_crossStreet = "not available";
                var fs_lat = "not available";
                var fs_long = "not available";
                var fs_phone = "not available";
                var fs_hours = "not available";
                var fs_days = "not available";
                var fs_isOpen = "not available";
                var fs_url = "not available";
                var fs_foursquarePageUrl = "not available";
                var fs_mainImage = "not available";
                var fs_additionalPhotos = "not available";

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
                      var hrs = venue['hours']['timeframes'][0]['open'];//['renderedTime'];
                      fs_hours = [];
                      console.log(hrs);
                      Object.keys(hrs).forEach(function(key) {
                        fs_hours.push(hrs[key].renderedTime);  
                      });
                    }
                    if (venue['hours']['timeframes'][0]['days'] !== undefined) {
                      fs_days = venue['hours']['timeframes'][0]['days'];//;['renderedTime'][0];
                      console.log(fs_days);
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

                var maxPhotoCount = 3;
                var photos = [];
                
                if (venue['photos']['groups'][0]['items'] !== undefined) {
                  photos = venue['photos']['groups'][0]['items'];
                }

                console.log(venue['photos']['groups'][0]['items']);

                for (var i = 0; i < photos.length; i++) {
                  if (i === 0) {
                    //fs_mainImage = (photos[i]['prefix'] + photos[i]['suffix']);
                    fs_mainImage = photos[i]["prefix"] + "300x300" + photos[i]["suffix"];
                  }
                  else if (fs_additionalPhotos.length < maxPhotoCount) {
                    fs_additionalPhotos.push(
                      photos[i]["prefix"] + "200x200" + photos[i]["suffix"]
                    );
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
                  fs_phone: fs_phone,
                  fs_hours: fs_hours,
                  fs_days: fs_days,
                  fs_isOpen: fs_isOpen,
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
        {/*this.state.venueImages !== undefined && this.state.venueIds !== undefined &&
          <SearchResultsGrid venueImages={this.state.venueImages} venueIds={this.state.venueIds} />
        */}

        <button className="btn" onClick={function() { history.back() }}>{'<'} Back</button>

        {this.state.loaded === true &&
          <div>
            {/*Restaurant Name*/}
            <h1>{this.state.fs_name}</h1>

            {/*Pictures*/}
            <div>
              <img src={this.state.fs_mainImage} alt={'Picture of ' + this.state.fs_name}></img>
            </div>
            <div>
              {/* Replace with grid with modals */}
              {this.state.fs_additionalPhotos.length > 0 &&
                <img src={this.state.fs_additionalPhotos[0]} alt={'1st picture of ' + this.state.fs_name}></img>
              }
              {this.state.fs_additionalPhotos.length > 1 &&
                <img src={this.state.fs_additionalPhotos[1]} alt={'2nd picture of ' + this.state.fs_name}></img>
              }
              {this.state.fs_additionalPhotos.length > 2 &&
                <img src={this.state.fs_additionalPhotos[2]} alt={'3rd picture of ' + this.state.fs_name}></img>
              }
            </div>

            {/*Restaurant address*/}
            {this.state.fs_address !== undefined &&
            <div>
              Restaurant address: {this.state.fs_address}
            </div>
            }

            {/*Rating*/}
            {this.state.fs_rating !== undefined &&
              <div>
                <div style={{color: customColor}}>
                  Rating: {this.state.fs_rating}
                </div>
                <div>
                  {this.state.fs_ratingSignals} reviews
                </div>
              </div>
            }
            {this.state.fs_rating === undefined &&
              <div>
                No ratings
              </div>
            }

            {/*Foursquare website link*/}
            {this.state.fs_foursquarePageUrl !== undefined &&
              <div>
                <a href={this.state.fs_foursquarePageUrl} target="_blank" >Foursquare Page</a>
              </div>
            }
            {this.state.fs_foursquarePageUrl === undefined &&
              <div>
                No Foursquare page
              </div>
            }

            {/*Restaurant website*/}
            {this.state.fs_url !== undefined &&
            <div>
              <a href={this.state.fs_url} target="_blank">Website</a>
            </div>
            }
            {this.state.fs_url === undefined &&
              <div>No restaurant URL</div>
            }

            {/* Hours of operation */}
            <div>
              <h3>Hours of operation:</h3>
              {this.state.fs_hours !== undefined &&
                <div>Hours: {this.state.fs_hours}</div>
              }
              {this.state.fs_hours === undefined &&
                <div>No hours data</div>
              }
              {this.state.fs_days !== undefined &&
                <div>Days: {this.state.fs_days}</div>
              }
              {this.state.fs_days === undefined || this.state.fs_days.length === 0 &&
                <div>No days data</div>
              }
              {this.state.fs_isOpen === true &&
                <div>Open now!</div>
              }
              {this.state.fs_isOpen === false &&
                <div>Closed now</div>
              }
              {this.state.fs_isOpen === undefined &&
                <div>No open/closed data</div>  
              }
            </div>

            {/* Map */}
            {this.state.fs_lat !== null && this.state.fs_long !== null &&
              <div>
                <a href={'https://www.google.com/maps/?q=' + this.state.fs_lat + ',' + this.state.fs_long} target="_blank">Google Maps Link</a>
              </div>
            }
            {this.state.fs_lat === null || this.state.fs_long === null &&
              <div>
                No location data
              </div>  
            }
            
          </div>
        }
      </div>
    );
  }
}

export default App;
