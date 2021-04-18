import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop/Backdrop.js';
import Button from '@material-ui/core/Button/Button.js';
import Card from '@material-ui/core/Card/Card.js';
import CardHeader from '@material-ui/core/CardHeader/CardHeader.js';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress.js';
import Dialog from '@material-ui/core/Dialog/Dialog.js';
import DialogActions from '@material-ui/core/DialogActions/DialogActions.js';
import DialogContent from '@material-ui/core/DialogContent/DialogContent.js';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle.js';
import MuiAlert from '@material-ui/lab/Alert/index.js';
import Snackbar from '@material-ui/core/Snackbar/Snackbar.js';
import TextField from '@material-ui/core/TextField/TextField.js';

export default function CustomerSettings() {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [oldPassCheck, setOldPassCheck] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [open, setOpen] = useState(false);
  const [openSuc, setOpenSuc] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const route = localStorage.getItem('user.loginType') === 'Customer' ? 'api/customer' : 'api/guide';
    axios.get(route, {
      params: {
        id: JSON.parse(localStorage.getItem('user.token')),
      },
    })
      .then((res) => {
        const name = res.data.customer.name.split(' ');
        setFirstName(name[0]);
        setLastName(name[1]);
        setEmail(res.data.customer.emailAddress);
        setPhone(res.data.customer.phoneNumber);
        setOldPassCheck(res.data.customer.password);
      })
      .catch((err) => console.error(err.message))
      .finally(() => setLoading(false));
  }, [0]);

  const firstNameChange = (firstVal) => {
    setFirstName(firstVal.target.value);
  };

  const lastNameChange = (lastVal) => {
    setLastName(lastVal.target.value);
  };

  const emailChange = (emailVal) => {
    setEmail(emailVal.target.value);
  };

  function isEmail(val) {
    // eslint-disable-next-line no-useless-escape
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEmail.test(val);
  }

  const oldPassChange = (oldPass2) => {
    setOldPass(oldPass2.target.value);
  };

  const passChange = (pass2) => {
    setPass(pass2.target.value);
  };

  const confirmPassChange = (confirmPass2) => {
    setConfirmPass(confirmPass2.target.value);
  };

  const phoneChange = (phoneVal) => {
    setPhone(phoneVal.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // check to make sure old password is valid
  };

  const cancelPass = () => {
    setOpen(false);
  };

  const saveChanges = () => {
    if (JSON.parse(localStorage.getItem('user.token')) !== null) {
      const route = localStorage.getItem('user.loginType') === 'Customer' ? 'api/customer' : 'api/guide';
      axios.post(route, {
        params: {
          id: JSON.parse(localStorage.getItem('user.token')),
          name: `${firstName} ${lastName}`,
          emailAddress: email,
          phoneNumber: phone,
          password: pass === '' ? oldPassCheck : pass,
        },
      })
        .then(() => {
          handleClose();
          setOpenSuc(true);
        })
        .catch((err) => console.error(err.message));
    } else {
      setOpenFail(true);
    }
  };

  if (loading) {
    return (
      <div className='loading'>
        <Backdrop open>
          <CircularProgress color='inherit' />
        </Backdrop>
      </div>
    );
  }
  return (
    <Card style={{ width: '30rem', padding: '30px', marginTop: '30px' }}>
      <CardHeader title={`Hi, ${firstName}!`} />
      <CardHeader title='Edit Profile Settings' />
      <form>
        <TextField
          margin='dense'
          id='firstName'
          label='First Name'
          type='text'
          value={firstName} // set value equal to previous first name
          onChange={firstNameChange}
          fullWidth
          required
        />
        <TextField
          margin='dense'
          id='lastName'
          label='Last Name'
          type='text'
          value={lastName} // set value equal to previous last name
          onChange={lastNameChange}
          fullWidth
          required
        />
        {isEmail(email)
              ? (
                <TextField
                  margin='dense'
                  id='email'
                  label='Email Address'
                  type='email'
                  onChange={emailChange}
                  value={email}
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
                  value={email}
                  fullWidth
                  required
                />
              )}
        <TextField
          margin='dense'
          id='phone'
          label='Phone Number'
          type='phone'
          onChange={phoneChange}
          value={phone}
          fullWidth
          required
        />
        {isEmail(email)
          ? (
            <Button style={{ float: 'left', marginTop: '20px' }} variant='contained' color='secondary' onClick={saveChanges}>
              Save Changes
            </Button>
          )
          : (
            <Button style={{ float: 'left', marginTop: '20px' }} variant='contained' color='secondary' disabled>
              Save Changes
            </Button>
          )
        }
        {/* <Button style={{ float: 'left', marginTop: '20px' }} variant='contained' color='secondary' onClick={saveChanges}>
          Save Changes
        </Button> */}
        <Button style={{ float: 'right', marginTop: '20px' }} variant='contained' color='primary' onClick={handleOpen}>
          Change Password
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>Change Password</DialogTitle>
          <DialogContent>
            <TextField
              margin='dense'
              id='oldpassword'
              label='Old Password'
              type='password'
              onChange={oldPassChange}
              fullWidth
              required
            />
            <TextField
              margin='dense'
              id='password'
              label='Password'
              type='password'
              onChange={passChange}
              fullWidth
              required
            />
            <TextField
              margin='dense'
              id='repassword'
              label='Re-enter Password'
              type='password'
              onChange={confirmPassChange}
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            {(oldPass !== ''
              && pass !== ''
              && isEmail(email) === true
              && confirmPass !== ''
              && pass === confirmPass
              && oldPass === oldPassCheck
              && oldPassCheck !== pass
              
            )
              ? (
                <Button variant='contained' color='primary' onClick={saveChanges}>Change Password</Button>
              )
              : (
                <Button disabled variant='contained'>Change Password</Button>
              )}
            <Button onClick={cancelPass} color='primary'>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={openSuc}
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          onClose={() => setOpenSuc(false)}
        >
          <MuiAlert elevation={6} variant='filled' severity='success'>
            Profile updated successfully!
          </MuiAlert>
        </Snackbar>
        <Snackbar
          open={openFail}
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          onClose={() => setOpenFail(false)}
        >
          <MuiAlert elevation={6} variant='filled' severity='error'>
            You must be logged in to save changes!
          </MuiAlert>
        </Snackbar>
      </form>
    </Card>
  );
}
