import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card'; 
import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function CustomerSettings(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('');

  const firstNameChange = (firstVal) => {
    setFirstName(firstVal.target.value);
  };

  const lastNameChange = (lastVal) => {
    setLastName(lastVal.target.value);
  };

  const emailChange = (emailVal) => {
    setEmail(emailVal.target.value);
  };

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
  }

  const handleClose = () => {
    setOpen(false);
    //check to make sure old password is valid
  }

  const cancelPass = () => {
    setOpen(false);
  }

  const saveChanges = () => {
    //save changes to db
    //firstName
    //lastName
    //email
    //pass
    //phone   
  }

  return (
    <Card style={{ width: '30rem' }}>
        <CardHeader title="Edit Profile Settings"></CardHeader>
        <form>
            <TextField
              margin='dense'
              id='firstName'
              label='First Name'
              type='text'
              value = {firstName} //set value equal to previous first name
              onChange = {firstNameChange}
              fullWidth
              required
            />
            <TextField
              margin='dense'
              id='lastName'
              label='Last Name'
              type='text'
              value = {lastName} //set value equal to previous last name
              onChange = {lastNameChange}
              fullWidth
              required
            />
            <TextField
              margin='dense'
              id='email'
              label='Email Address'
              type='email'
              onChange={emailChange}
              value = {email} //set value to previous email
              fullWidth
              required
            />
            <Button variant="contained" color="primary" onClick={handleOpen}>Change Password</Button>
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
                  )
                  ? (
                    <Button variant="contained" color="primary" onClick={handleClose}> Change Password</Button>
                  )
                  : (
                    <Button disabled variant="contained"> Change Password</Button>
                  )}
                  <Button onClick={cancelPass} color='primary'>
                    Cancel
                  </Button>
              </DialogActions>
            </Dialog>
            <TextField
              margin='dense'
              id='phone'
              label='Phone Number'
              type='phone'
              onChange={phoneChange}
              value = {phone}
              fullWidth
              required
            />
            <Button variant="contained" color="secondary" onClick={saveChanges}> Save Changes</Button>
        </form> 
    </Card>
  );
}
