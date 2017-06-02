import React, { Component } from 'react';
//import logo from './logo.svg';
import { Dialog, DialogContent } from 'react-mdl';
import { Modal } from 'react-modal';

class SearchSquare extends Component {

  // constructor(props) {
  // super(props);
  //   this.state = {};
  //   this.handleOpenDialog = this.handleOpenDialog.bind(this);
  //   this.handleCloseDialog = this.handleCloseDialog.bind(this);
  // }

  // handleOpenDialog() {
  //   this.setState({
  //     openDialog: true
  //   });
  // }

  // handleCloseDialog() {
  //   this.setState({
  //     openDialog: false
  //   });
  // }
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

  //idk
  //   this.state = {
  //     isShowingModal: false,
  //   }
  // }
  // handleClick = () => this.setState({ isShowingModal: true })
  // handleClose = () => this.setState({ isShowingModal: false })

  /*return <a onClick={this.handleClick}>
    <span>Button Text</span>
    {
      this.state.isShowingModal &&
      <ModalComponentHere onClose={this.handleClose}/>
    }
  </a>;
}
}*/




  render() {
    return (
      <div className="search-square">
        <img className="search-image" src={this.props.image} alt={this.props.venueId} />
        {/*The venue id: {this.props.venueId}*/}


        {/*taking out overlay for testing purposes*/}
        <div className="overlay" onClick={this.handleOpenDialog}  >
          <div className="overlay-text">{this.props.venueName}</div>
        </div>



        <Dialog open={this.state.openDialog} className="modal light">

          {/* onClick={this.handleClose}*/}
          <button type='button' className='exit light' onClick={this.handleCloseDialog}>X</button>
          <DialogContent className="light">

            <img className="photo" src={this.props.image} alt={this.props.venueID} />
            <div className="info">
              <h1 className="light modal-heading">{this.props.venueName}</h1>
              <span className="links">
                <a href={this.props.venueWebsite} className="button">Website</a>
                <a className="button" href={this.props.venueMenus}>Menu</a>
              </span>
              <p><span className="subheading">Address: </span>{this.props.venueAddress}</p>
              <p><span className="subheading">Phone: </span>{this.props.venuePhone}</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}


export default SearchSquare;

