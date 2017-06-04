import React, { Component } from 'react';
//import logo from './logo.svg';
import { Dialog, DialogContent } from 'react-mdl';
import { hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
 

class SearchSquare extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.goToRestaurantPage = this.goToRestaurantPage.bind(this);
    this.goToFoursquarePage = this.goToFoursquarePage.bind(this);
  }

  handleOpenDialog() {
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
  }

  goToFoursquarePage() {
    console.log(this.props.venueFoursquarePage);
    if (this.props.venueFoursquarePage !== undefined) {
      console.log('memes');
      window.open(this.props.venueFoursquarePage, '_blank');
      window.focus();
    }
  }

  goToRestaurantPage() {
    if (this.props.venueId !== undefined) {
      hashHistory.push('/restaurant?venue_id=' + this.props.venueId);
    }
  }


  render() {
    console.log(this.props);
    console.log(this.props.venueRatingColor)
    var customColor = '';


    customColor = "#" + this.props.venueRatingColor;

    console.log('CC: ' + customColor);



    return (
      <div className="search-square">
        <img className="search-image" src={this.props.image} alt={this.props.venueId} />
        {/*The venue id: {this.props.venueId}*/}


        {/*taking out overlay for testing purposes*/}
        <div className="overlay clickable" onClick={this.handleOpenDialog}  >

          <div className="overlay-text">
            <div>{this.props.venueName}</div>
            <div onClick={this.goToRestaurantPage}>
            </div>
          </div>
        </div>

        <Dialog open={this.state.openDialog} className="modal light zindexone" onClick={this.handleCloseDialog}>


          {/* onClick={this.handleClose}*/}
          <div className="zindextwo" onClick={function(event) { event.stopPropagation()}}>
          <button type='button' className='clickable exit light' onClick={this.handleCloseDialog}>X</button>
          <DialogContent className="light">

            <img className="photo clickable" src={this.props.image} alt={this.props.venueID} onClick={this.goToRestaurantPage} />
            <div className="info">
              <h1 className="light modal-heading black" onClick={this.goToRestaurantPage}>{this.props.venueName}</h1>
              <div>
                <div className="fourSquare-logo" onClick={this.goToFoursquarePage}>
                </div>
                {this.props.venueRating !== undefined &&
                  <span className="rating" style={{ color: customColor }}>{this.props.venueRating}/10</span>
                }
                {this.props.venueRating === undefined &&
                  <span className="rating grey">No ratings</span>
                }
                </div>
                <div className="wrapper">
              <span className="links">
                {this.props.venueWebsite !== undefined &&
                  <a href={this.props.venueWebsite} target="_blank" className="mdl-button mdl-js-button mdl-js-ripple-effect button light go-button">Website</a>
                }
                {this.props.venueMenus !== undefined && 
                  <a className="mdl-button mdl-js-button mdl-js-ripple-effect button light go-button butt" href={this.props.venueMenus} target="_blank" >Menu</a>
                }
              </span>
              </div>
              <div className="contact disappears-in-mobile">
                {this.props.venueAddress !== undefined &&
                <div className="light">
                  <div className="light"><b>Address:</b> {this.props.venueAddress}</div>
                </div>
                }
                {this.props.venueAddress === undefined &&
                  <div>No address information</div>  
                }
                {this.props.venuePhone !== undefined &&
                  <div className="light"><b>Phone:</b> {this.props.venuePhone}</div>
                }
                {this.props.venuePhone === undefined &&
                  <div>No phone number</div>  
                }
              </div>
              <div className="wrapper">
                <button onClick={this.goToRestaurantPage} className="mdl-button mdl-js-button mdl-js-ripple-effect button light go-button butt view-more">View more information</button>
              </div>
            </div>
          </DialogContent>
          </div>
        </Dialog>
      </div>
    );
  }
}


export default SearchSquare;

