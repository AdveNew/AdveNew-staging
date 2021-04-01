/* eslint-disable import/extensions */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function Signup(props) {
  const { open, onClose } = props;

  return (
    <form>
      <div>
        <Dialog open={open} onClose={onClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>Sign Up</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='firstName'
              label='First Name'
              type='text'
              fullWidth
              required
            />
            <TextField
              margin='dense'
              id='lastName'
              label='Last Name'
              type='text'
              fullWidth
              required
            />
            <TextField
              margin='dense'
              id='email'
              label='Email Address'
              type='email'
              fullWidth
              required
            />
            <TextField
              margin='dense'
              id='password'
              label='Password'
              type='password'
              fullWidth
              required
            />
            <TextField
              margin='dense'
              id='repassword'
              label='Re-enter Password'
              type='password'
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={onClose} color='primary'>
              Register
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </form>
  );
}
