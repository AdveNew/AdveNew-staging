/* eslint-disable import/extensions */
import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function Signup(props) {
  const { open, onClose } = props;
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [shopName, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [signupType, setSignupType] = useState('Customer');

  const passChange = (pass2) => {
    setPass(pass2.target.value);
  };

  const confirmPassChange = (confirmPass2) => {
    setConfirmPass(confirmPass2.target.value);
  };

  const firstNameChange = (firstVal) => {
    setFirstName(firstVal.target.value);
  };

  const lastNameChange = (lastVal) => {
    setLastName(lastVal.target.value);
  };

  const shopNameChange = (shopVal) => {
    setShopName(shopVal.target.value);
  };

  function isEmail(val) {
    // eslint-disable-next-line no-useless-escape
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEmail.test(val);
  }

  const emailChange = (emailVal) => {
    setEmail(emailVal.target.value);
    isEmail(emailVal);
  };

  const changeSignup = (event) => {
    setSignupType(event.target.value);
  };

  const submitDB = () => {
    axios.post('api/signup', {
      params: {
        dbCol: signupType,
        name: signupType === 'Shop' ? shopName : `${firstName} ${lastName}`,
        emailAddress: email,
        password: pass,
      },
    })
      .then(() => {
        onClose();
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <form>
      <div>
        <Dialog open={open} onClose={onClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>Sign Up</DialogTitle>
          <DialogContent>
            <Grid container justify='center'>
              <RadioGroup aria-label='selectSignup' name='signup' value={signupType} onChange={changeSignup} row>
                <FormControlLabel value='Customer' control={<Radio />} label='Customer' />
                <FormControlLabel disabled value='Guide' control={<Radio />} label='Guide' />
                <FormControlLabel value='Shop' control={<Radio />} label='Shop' />
              </RadioGroup>
            </Grid>
            {(signupType === 'Shop')
              ? (
                <TextField
                  autoFocus
                  margin='dense'
                  id='shopName'
                  label='Shop Name'
                  type='text'
                  onChange={shopNameChange}
                  fullWidth
                  required
                />
              )
              : (
                <div>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='firstName'
                    label='First Name'
                    type='text'
                    onChange={firstNameChange}
                    fullWidth
                    required
                  />
                  <TextField
                    margin='dense'
                    id='lastName'
                    label='Last Name'
                    type='text'
                    onChange={lastNameChange}
                    fullWidth
                    required
                  />
                </div>
              )}
            {isEmail(email)
              ? (
                <TextField
                  margin='dense'
                  id='email'
                  label='Email Address'
                  type='email'
                  onChange={emailChange}
                  fullWidth
                  required
                />
              ) : (
                <TextField
                  margin='dense'
                  id='email'
                  error
                  label='Email Address'
                  type='email'
                  onChange={emailChange}
                  fullWidth
                  required
                />
              )}
            <TextField
              margin='dense'
              id='password'
              label='Password'
              type='password'
              onChange={passChange}
              fullWidth
              required
            />
            {pass === confirmPass && confirmPass !== ''
              ? (
                <TextField
                  margin='dense'
                  id='repassword'
                  label='Re-enter Password'
                  type='password'
                  onChange={confirmPassChange}
                  fullWidth
                  required
                />
              ) : (
                <TextField
                  margin='dense'
                  error
                  id='repassword'
                  label='Re-enter Password'
                  type='password'
                  onChange={confirmPassChange}
                  fullWidth
                  required
                />
              ) }
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color='primary'>
              Cancel
            </Button>
            {(pass !== ''
            && confirmPass !== ''
            && pass === confirmPass
            && ((firstName !== '' && lastName !== '')
            || shopName !== '')
            && email !== '')
            && isEmail(email) === true

              ? (
                <Button onClick={submitDB}>
                  Register
                </Button>
              )
              : (
                <Button disabled>
                  Register
                </Button>
              )}
          </DialogActions>
        </Dialog>
      </div>
    </form>
  );
}
