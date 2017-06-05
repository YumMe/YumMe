import React, { Component } from 'react';
//import { Dialog, DialogContent } from 'react-mdl';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';

const customStyles = {
  content : {
    width                 : '50vw',
    border                : 'none',
    top                   : '60%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-20%',
    transform             : 'translate(-50%, -50%)'
  }
};

class RestaurantImageModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
    /*this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);*/
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  /*handleOpenDialog() {
    console.log(this.props.image);
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
  }*/

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    console.log(this.props.image);
    
    var size = 'size900';

    if (this.props.size === 450) {
      size = 'size450';
    }

    return (
      <div className="change-cursor-to-pointer-on-hover">
        <div className={size} onClick={this.openModal}>
          <img src={this.props.image} alt="Yummy!" className={size}  />
        </div>
        {/*The venue id: {this.props.venueId}*/}

        {/*<Dialog open={this.state.openDialog} className="modal light zindexone" onClick={this.handleCloseDialog}>*/}
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} style={customStyles} onClick={this.closeModal}>


          {/* onClick={this.handleClose}*/}
          <div className="zindextwo" onClick={function(event) { event.stopPropagation()}}>
            <button type='button' className='clickable exit light' onClick={this.closeModal}>X</button>
            <div className="light clickable" onClick={this.closeModal}>
              <img src={this.props.image} alt="Yummy!" className="size1000" />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}


export default RestaurantImageModal;

