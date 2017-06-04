import React, { Component } from 'react';
//import logo from './logo.svg';
import SearchSquare from './SearchSquare';

class SearchGrid extends Component {
  constructor(props) {
    super(props);
    this.componentWillUpdate = this.componentWillUpdate.bind(this);
    this.state = {
      loaded: 1
    }
  }

  componentWillUpdate() {
    window.onscroll = (ev) => {
      if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && this.state.loaded < 5) {
        //console.log("woo" + this.state.loaded);
        this.setState({loaded: (this.state.loaded + 1)});
      }
    };
  }

  render() {
    var array = [];
    for (var i = 0; i < (15 * this.state.loaded); i++) {
      if(this.props.venueImages[i] != undefined) {
        
        array.push(<SearchSquare 
        image={this.props.venueImages[i]} 
        venueId={this.props.venueIds[i]} 
        venueName={this.props.venueNames[i]} 
        venueAddress={this.props.venueAddress[i]} 
        venuePhone={this.props.venuePhone[i]} 
        venueMenus={this.props.venueMenus[i]} 
        venueWebsite={this.props.venueWebsite[i]} 
        venueRating={this.props.venueRating[i]}
        venueRatingColor={this.props.venueRatingColor[i]}
        venueFoursquarePage={this.props.venueFoursquarePage[i]}
        key={i} />);
        //array.push(<SearchSquare image={this.props.venueImages[i]} key={i} />);
      }
      
      //console.log(this.state.venueRating);
      //console.log(this.state.venueRatingColor);
    }

    return (
      <div>
        <div className="search-grid">
          {array}
        </div>
      </div>
    );
  }
}

export default SearchGrid;
