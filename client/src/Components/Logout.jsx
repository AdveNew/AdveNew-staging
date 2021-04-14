/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Logout() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('user.token');
    localStorage.removeItem('user.loginType');
  }, [0]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle id='alert-dialog-title'>Log Out</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            You have been successfully logged out.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='primary'>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
