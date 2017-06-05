import React, { Component } from 'react';
//import logo from './logo.svg';
import Logo from './Logo';
import SearchBar from './SearchBar';
import SearchResultsGrid from './SearchResultsGrid';
import RestaurantImageModal from './RestaurantImageModal';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false, // not done making API call yet
      missingQuery: false
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

      this.setState({ venue_id: currId });

      // Fetch restaurant
      fetch('https://api.foursquare.com/v2/venues/' + currId + '?client_id=N2POGB50IPO43FHUPOHRRJE0FWNDTV5DUCITOFVFWIXHBLUD&client_secret=JURFUE0WYS02ZFQJ0O132PIXOTBNJK1IDMQING34BNNNVYWL&v=20170622')
        .then(
        (response) => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            this.setState({ missingQuery: true });
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
                    fs_address = venue['location']['address'] + ' ' + venue['location']['city'] + ', ' + venue['location']['state'];
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
                  if (venue['hours']['timeframes'] !== undefined) {
                    var tfKeys = Object.keys(venue['hours']['timeframes']);

                    fs_hours = [];
                    fs_days = [];

                    console.log(venue['hours']['timeframes']);

                    tfKeys.forEach(function (key) {

                      var opens = Object.keys(venue['hours']['timeframes'][key]['open']);
                      var this_fsHours = [];
                      opens.forEach(function (key2) {
                        this_fsHours.push(venue['hours']['timeframes'][key]['open'][key2]['renderedTime']);
                      });
                      fs_hours.push(this_fsHours);//['renderedTime']);
                      fs_days.push(venue['hours']['timeframes'][key]['days']);
                    });
                  }
                  //   if (venue['hours']['timeframes'][0]['open'] !== undefined) {


                  //     var hrs = venue['hours']['timeframes'][0]['open'];//['renderedTime'];
                  //     fs_hours = [];
                  //     console.log(hrs);
                  //     Object.keys(hrs).forEach(function(key) {
                  //       fs_hours.push(hrs[key].renderedTime);  
                  //     });
                  //   }
                  //   if (venue['hours']['timeframes'][0]['days'] !== undefined) {
                  //     var days = venue['hours']['timeframes'];//[0]['days'];//;['renderedTime'][0];



                  //     console.log(venue['hours']['timeframes']);
                  //   }
                  // }
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
                    //fs_mainImage = (photos[i]['prefix'] + photos[i]['suffix']);
                    fs_mainImage = photos[i]["prefix"] + "900x900" + photos[i]["suffix"];
                  }
                  else if (fs_additionalPhotos.length < maxPhotoCount) {
                    fs_additionalPhotos.push(
                      photos[i]["prefix"] + "900x900" + photos[i]["suffix"]
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
      this.setState({ missingQuery: true });
      console.log(this.state.missingQuery);
    }
  }




  render() {

    var customColor = '';

    if (this.state.loaded === true) {
      customColor = "#" + this.state.fs_ratingColor;
    }
    console.log('CC: ' + customColor);

    var that = this;

    return (
      <div>
        <div className="navigation">
          <div className="logo-navigation">
            <Logo />
          </div>
          <div className="search-navigation">
            <SearchBar />
          </div>
          {this.state.missingQuery === true &&
            <div className="black-text">
              Restaurant with specified ID not found
          </div>
          }
        </div>
        {/*this.state.venueImages !== undefined && this.state.venueIds !== undefined &&
          <SearchResultsGrid venueImages={this.state.venueImages} venueIds={this.state.venueIds} />
        */}

        <div className="restaurant-view">



          {this.state.loaded === true &&
            <div>


              <div className="left-pics">
                {/*Pictures*/}
                <div className="restaurant-pic">
                  
                  <RestaurantImageModal image={this.state.fs_mainImage} size={900} key={0} />
                </div>
                
                {/*
                  
              <img src={this.state.fs_mainImage} alt={'Picture of ' + this.state.fs_name} className="image-filter size900"></img>  
              <img src={this.state.fs_additionalPhotos[0]} alt={'1st picture of ' + this.state.fs_name} className="image-filter size450"></img>*/}
                <div className="restaurant-pics">
                  {/* Replace with grid with modals */}
                  {this.state.fs_additionalPhotos.length > 0 &&
                    <RestaurantImageModal image={this.state.fs_additionalPhotos[0]} size={450} key={1} />
                  }
                  {this.state.fs_additionalPhotos.length > 1 &&
                    <RestaurantImageModal image={this.state.fs_additionalPhotos[1]} size={450} key={2} />
                  }
                  {this.state.fs_additionalPhotos.length > 2 &&
                    <RestaurantImageModal image={this.state.fs_additionalPhotos[2]} size={450} key={3} />
                  }
                </div>
              </div>

              <div className="right-information">
                {/*Restaurant Name*/}
                <h1 className="restaurant-title">{this.state.fs_name}</h1>
                <div>

                {/*Rating, Foursquare, Website */}
                {this.state.fs_rating !== undefined &&
                  <div>
                    <span className="rating" style={{ color: customColor }}>
                      {this.state.fs_rating} / 10
                    </span>
                    <span className="review">
                      {this.state.fs_ratingSignals} ratings
                    </span>
                  </div>
                }
                {this.state.fs_rating === undefined &&
                  <div>
                    No ratings
                      </div>
                }

                { this.state.fs_foursquarePageUrl !== undefined &&
                  <a href={this.state.fs_foursquarePageUrl} target="_blank" className="fourSquare-logo"></a>
                }
                {this.state.fs_foursquarePageUrl === undefined &&
                  <div>
                    No Foursquare page
                      </div>
                }

                {this.state.fs_url !== undefined &&
                  <div>
                    <a href={this.state.fs_url} target="_blank" className="mdl-button mdl-js-button mdl-js-ripple-effect button light go-button butt-web">Website</a>
                  </div>
                }
                {this.state.fs_url === undefined &&
                  <div>No restaurant URL</div>
                }
                
                


                {/*Foursquare undefined*/}

                

                {/*Restaurant website undefined*/}
                

                {/*Phone, address*/}
                {this.state.fs_phone !== undefined && this.state.fs_address !== undefined && this.state.fs_lat !== null && this.state.fs_long !== null &&
                  <div className="phone">
                    <h4>Phone number:</h4>
                    {this.state.fs_phone}
                    <h4>Restaurant address:</h4>
                    {this.state.fs_address}
                    <iframe className="map" src={'https://www.google.com/maps/embed/v1/place?q=' +
                      this.state.fs_lat +
                      ',' +
                      this.state.fs_long +
                      '&zoom=17&key=AIzaSyCPYUmzO3MqBwvcPjGdacMywrz06Vz8VK8'}>
                    </iframe>
                  </div>
                }

                {/* Hours of operation */}
                <div className="hours">

                  {this.state.fs_hours !== undefined && this.state.fs_days !== undefined &&
                    <div>

                      <h4>Hours of operation:</h4>
                      <table className="mdl-data-table hours-table">
                        <thead>
                          <tr>
                            <th>Day(s)</th>
                            <th>Hours</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.fs_days.map(function(row, i) {
                            return (
                              <tr key={i}>
                                  <td>
                                    {row}
                                  </td>
                                  <td>
                                    {that.state.fs_hours[i].map(function(row, j) {
                                      return (
                                        <span key={j}>{row}{j !== that.state.fs_hours[i].length - 1 && <span>,</span>}</span>
                                      )
                                    })}
                                  </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    
                  }
                  {this.state.fs_hours === undefined &&
                    <div>No hours data</div>
                  }
                  {this.state.fs_days === undefined || this.state.fs_days.length === 0 &&
                    <div>No days data</div>
                  }



                  {this.state.fs_isOpen === true &&
                    <div className="hours-status">Open now!</div>
                  }
                  {this.state.fs_isOpen === false &&
                    <div className="hours-status">Currently closed</div>
                  }
                  {this.state.fs_isOpen === undefined &&
                    <div className="hours-status">No open/closed data</div>
                  }
                </div>

                {/* Map undefined */}
                {this.state.fs_lat === null || this.state.fs_long === null &&
                  <div>
                    No location data
                      </div>
                }

              </div>
            </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
