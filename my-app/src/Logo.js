import React, { Component } from 'react';
//import logo from './logo.svg';
import { hashHistory } from 'react-router';

// When logo is clicked, go to front page
export default class Logo extends Component {
  render() {
    return (
      <div className="title change-cursor-to-pointer-on-hover" onClick={function() { hashHistory.push('/'); }}>
        YumMe!
      </div>
    );
  }
}