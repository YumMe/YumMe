import React, { Component } from 'react';
import { Dialog, DialogContent } from 'react-mdl';
import ReactDOM from 'react-dom';
 

class RestaurantImageModal extends Component {

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
    console.log(this.props);
    var customColor = '';

    return (
      <div className="search-square">
        <img className="search-image" src={this.props.image} alt="Yummy!" />
        {/*The venue id: {this.props.venueId}*/}


        {/*taking out overlay for testing purposes*/}
        <div className="overlay clickable" onClick={this.handleOpenDialog}  >
        </div>

        <Dialog open={this.state.openDialog} className="modal light zindexone" onClick={this.handleCloseDialog}>


          {/* onClick={this.handleClose}*/}
          <div className="zindextwo" onClick={function(event) { event.stopPropagation()}}>
          <button type='button' className='clickable exit light' onClick={this.handleCloseDialog}>X</button>
          <DialogContent className="light">

          </DialogContent>
          </div>
        </Dialog>
      </div>
    );
  }
}


export default RestaurantImageModal;

