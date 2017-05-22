import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from 'react-mdl';
import './modal.css';

class Modal extends React.Component {
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
            <div className='modal'>
                <Button onClick={this.handleOpenDialog} raised ripple>Show Dialog</Button> 
                <Dialog open={this.state.openDialog}>
                    <button type='button' className='exit light' onClick={this.handleCloseDialog}>X</button>
                    <DialogContent>
                        <h1 className='light modal'> Restaurant Name</h1>
                        <img src='../img/pasta.png'/>
                        <p>Insert rating scale here</p>
                        <Button type='Button'>Menu</Button>
                        <Button type='Button'>Website</Button>
                        <p>Address</p>
                        <p>phone number</p>
                    </DialogContent>

                </Dialog>
            </div>
        );
    }
}
export default Modal;