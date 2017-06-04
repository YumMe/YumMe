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
    console.log(this.props.image);
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
    console.log(this.props.image);
    
    var size = 'size900';

    if (this.props.size === 450) {
      size = 'size450';
    }

    return (
      <div className="change-cursor-to-pointer-on-hover">
        <div className={size} onClick={this.handleOpenDialog}>
          <img src={this.props.image} alt="Yummy!" className={size}  />
        </div>
        {/*The venue id: {this.props.venueId}*/}

        <Dialog open={this.state.openDialog} className="modal light zindexone" onClick={this.handleCloseDialog}>


          {/* onClick={this.handleClose}*/}
          <div className="zindextwo" onClick={function(event) { event.stopPropagation()}}>
            <button type='button' className='clickable exit light' onClick={this.handleCloseDialog}>X</button>
            <DialogContent className="light clickable" onClick={this.handleCloseDialog}>
              <img src={this.props.image} alt="Yummy!" className="size1000" />
            </DialogContent>
          </div>
        </Dialog>
      </div>
    );
  }
}


export default RestaurantImageModal;

