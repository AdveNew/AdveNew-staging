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
  const [shopName, setShopName] = useState('');
  const [hours, setHours] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [oldPassCheck, setOldPassCheck] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [open, setOpen] = useState(false);
  const [openSuc, setOpenSuc] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    axios.get('api/shop', {
      params: {
        id: JSON.parse(localStorage.getItem('user.token')),
      },
    })
      .then((res) => {
        setShopName(res.data.shop.name);
        setHours(res.data.shop.hours);
        setEmail(res.data.shop.emailAddress);
        setPhone(res.data.shop.phoneNumber);
        setUrl(res.data.shop.websiteUrl);
        setDetails(res.data.shop.details);
        setOldPassCheck(res.data.shop.password);
      })
      .catch((err) => console.error(err.message))
      .finally(() => setLoading(false));
  }, [0]);

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
      axios.post('api/shop', {
        params: {
          id: JSON.parse(localStorage.getItem('user.token')),
          name: shopName,
          hours,
          emailAddress: email,
          phoneNumber: phone,
          websiteUrl: url,
          details,
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
      <CardHeader title='Edit Profile Settings' />
      <form>
        <TextField
          margin='dense'
          id='shopName'
          label='Shop Name'
          type='text'
          value={shopName} // set value equal to previous first name
          onChange={(e) => setShopName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          margin='dense'
          id='shopHours'
          label='Shop Hours'
          type='text'
          value={hours} // set value equal to previous first name
          onChange={(e) => setHours(e.target.value)}
          fullWidth
          required
        />
        <TextField
          margin='dense'
          id='email'
          error={isEmail(email)}
          label='Email Address'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email} // set value to previous email
          fullWidth
          required
        />
        <TextField
          margin='dense'
          id='phone'
          label='Phone Number'
          type='phone'
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          fullWidth
          required
        />
        <TextField
          margin='dense'
          id='url'
          label='Website'
          type='text'
          value={url} // set value equal to previous first name
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
          required
        />
        <TextField
          margin='dense'
          id='details'
          label='Shop Details'
          type='text'
          value={details} // set value equal to previous first name
          onChange={(e) => setDetails(e.target.value)}
          fullWidth
          required
          multiline
          rowsMax={6}
        />
        <Button style={{ float: 'left', marginTop: '20px' }} variant='contained' color='secondary' onClick={saveChanges} disabled={isEmail(email)}>
          Save Changes
        </Button>
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
