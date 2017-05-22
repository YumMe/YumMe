import React, { Component } from 'react';
import logo from './logo.svg';
import SearchSquare from './SearchSquare';

class SearchGrid extends Component {
  constructor(props) {
    super(props);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  componentWillReceiveProps() {
    var venues = this.props.topVenues;
    console.log(this.props.topVenues);
    console.log(this.props.test);
  }

  render() {
    var array = [];
    for (var i = 0; i <  15; i ++) {
      array.push(<SearchSquare />);
    }

    return (
      <div>
        {array}
      </div>
    );
  }
}

export default SearchGrid;
