/* eslint-disable import/extensions */
import React, {useState} from 'react';
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

export default function Login(props) {
  const { open, onClose } = props;
  const [loginType, setLoginType] = useState('Customer');

  const changeLogin = (event) => {
    setLoginType(event.target.value);
  };

  return (
    <form>
      <div>
        <Dialog open={open} onClose={onClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>Log In</DialogTitle>
          <Grid container justify="center">
            <RadioGroup aria-label="selectLogin" name="login" value={loginType} onChange={changeLogin} row>
              <FormControlLabel value="Customer" control={<Radio />} label="Customer" />
              <FormControlLabel value="Guide" control={<Radio />} label="Guide" />
              <FormControlLabel value="Shop" control={<Radio />} label="Shop" />
            </RadioGroup>
          </Grid>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='email'
              label='Email Address'
              type='email'
              fullWidth
            />
            <TextField
              margin='dense'
              id='password'
              label='Password'
              type='password'
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={onClose} color='primary'>
              Log In
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </form>
  );
}
