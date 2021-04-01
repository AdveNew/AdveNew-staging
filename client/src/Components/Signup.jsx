/* eslint-disable import/extensions */
import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function Signup(props) {

  const { open, onClose } = props;
  // const passRef = useRef();
  // const passConfirmRef = useRef();
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const passChange = (pass) => {
    setPass(pass.target.value);
  };

  const confirmPassChange = (confirmPass) => {
    setConfirmPass(confirmPass.target.value);
  };

  const firstNameChange = (firstVal) => {
    setFirstName(firstVal.target.value);
  };

  const lastNameChange = (lastVal) => {
    setLastName(lastVal.target.value);
  };

  const emailChange = (emailVal) => {
    setEmail(emailVal.target.value);
  };

  return(
    <form>
      <div>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label="First Name"
              type="text"
              onChange={firstNameChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              onChange={lastNameChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              onChange={emailChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              // inputRef={passRef}
              onChange={passChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              id="repassword"
              label="Re-enter Password"
              type="password"
              // inputRef={passConfirmRef}
              onChange={confirmPassChange}
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            {(pass !== '' 
            && confirmPass !== '' 
            && pass == confirmPass 
            && firstName !== '' 
            && lastName !== '' 
            && email !== '')
              ? (
                <Button onClick={onClose}>
                  Register
                </Button>
              )
              : (
                <Button disabled={true}>
                  Register
                </Button>
              )
            }
          </DialogActions>
        </Dialog>
      </div>
    </form>
  );
}