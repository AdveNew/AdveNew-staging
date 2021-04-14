/* eslint-disable import/extensions */
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Logout(props) {
  const { open, onClose } = props;

  const onSubmit = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('user.token');
    localStorage.removeItem('user.loginType');
    localStorage.removeItem('user.email');
    onClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onSubmit}
      >
        <DialogTitle id='alert-dialog-title'>Log Out</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            You have been successfully logged out.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} color='primary' component={Link} to='/'>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {open ? <Redirect to='/' /> : null}
    </div>
  );
}
