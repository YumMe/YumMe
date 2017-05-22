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

        xhr.open("GET", "https://api.yelp.com/v3/businesses/search?term=Meesum&location=seattle%2C%20wa");
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("authorization", "Bearer mFx9GawCOq_cHnJvJ03aPdCGXyZMQCluSNVVFJ6Exb9nftJaIUTyXiukKT19_86n3P13wV_lbaNOyxUhoyXspWEWPeJ-8YjKIzDzHp9yPaY3zb2IAHs5f5adRl8WWXYx");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.setRequestHeader("postman-token", "13dc087b-69b6-539d-241b-9f0c12423a19");

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
