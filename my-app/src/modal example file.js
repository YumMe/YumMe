import React, { Component } from 'react';
import logo from './logo.svg';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from 'react-mdl';
import './modal.css';


class SearchSquare extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
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

  render() {
    return (
      <div className="searchSquare">
        <img src={this.props.image} onClick={this.handleOpenDialog} />
        The venue id: {this.props.venueId}
        <div className="modal">
          <Dialog open={this.state.openDialog}>
            <button type='button' className='exit light' onClick={this.handleCloseDialog}>X</button>
            <DialogContent>
              <h1 clssName="light">{this.props.venueId}</h1>
            </DialogContent>
          </Dialog>
          {/*The venue id: {this.props.venueId}*/}
          <div className="overlay">
            <div className="overlay-text">{this.props.venueName}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchSquare;
