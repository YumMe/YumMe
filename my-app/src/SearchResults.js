'use strict';
import React, { Component } from 'react';
import logo from './logo.svg';

class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.componentWillReceiveProps();
    }

    componentWillReceiveProps() {
        const yelp = require('yelp-fusion');
        const token = {"token":"mFx9GawCOq_cHnJvJ03aPdCGXyZMQCluSNVVFJ6Exb9nftJaIUTyXiukKT19_86n3P13wV_lbaNOyxUhoyXspWEWPeJ-8YjKIzDzHp9yPaY3zb2IAHs5f5adRl8WWXYx"};
        const client = yelp.client(token);
        client.search({
            term:'Four Barrel Coffee',
            location: 'san francisco, ca'
        }).then(response => {
            console.log(response.jsonBody.businesses[0].name);
        }).catch(e => {
            console.log(e);
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
