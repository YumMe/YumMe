import React, { Component } from 'react';
import logo from './logo.svg';

class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.componentDidMount();
    }

    componentDidMount() {
        fetch('https://api.foursquare.com/v2/venues/search?near=Seattle,WA&query=meesum&v=20170605&oauth_token=BDZNBZTLKPWYMKVBHHSZSJJ2J0XJOGPBAT0P1QS0HLVNIQFA')
        .then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            // Examine the text in the response  
            response.json().then(function (data) {
                console.log(JSON.stringify(data));
                });
        }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    }

  render() {
    return (
      <div className="title">
        YumMe! This is the search results page
      </div>
    );
  }
}

export default SearchResults;
