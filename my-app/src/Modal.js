import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Dialog, DialogTitle, DialogContent, DialogActions } from 'react-mdl';
import './modal.css';

class Modal extends React.Component {

        constructor(props) {
        super(props);
        this.state = {};
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }
    handleCloseDialog() {
        this.setState({
            openDialog: false
        });
    }

    render() {
        return (
            <div className='modal'>
                <Dialog open={this.state.openDialog}>
                    <button type='button' className='exit light' onClick={this.handleCloseDialog}>X</button>
                    <DialogContent>
                        hi
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
export default Modal;