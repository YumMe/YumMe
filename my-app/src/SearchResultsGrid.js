import React, { Component } from 'react';
import logo from './logo.svg';
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
        array.push(<SearchSquare image={this.props.venueImages[i]} venueId={this.props.venueIds[i]} key={i} />);
      }
    }

    return (
      <div>
        {array}
      </div>
    );
  }
}

export default SearchGrid;
