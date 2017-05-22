import React, { Component } from 'react';
import logo from './logo.svg';

class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.componentDidlMount();
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

      xhr.open("GET", "https://api.yelp.com/v3/businesses/search?term=Henrys&location=seattle%2C%20wa");
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("authorization", "Bearer mFx9GawCOq_cHnJvJ03aPdCGXyZMQCluSNVVFJ6Exb9nftJaIUTyXiukKT19_86n3P13wV_lbaNOyxUhoyXspWEWPeJ-8YjKIzDzHp9yPaY3zb2IAHs5f5adRl8WWXYx");
      xhr.setRequestHeader("cache-control", "no-cache");
      xhr.setRequestHeader("postman-token", "2d94d796-e179-41d0-a3e4-f2a342847333");

      xhr.send(data);
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
