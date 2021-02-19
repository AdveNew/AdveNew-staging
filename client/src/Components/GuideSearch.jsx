/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  Backdrop,
  FormControl,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
      backgroundColor: 'white',
      flex: 1,
      borderBottom: 0,
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [0]);

  if (loading) {
    // return (<h1>Loading data...</h1>);
    return (
      <div className='loading'>
        <Backdrop open>
          <CircularProgress color='inherit' />
        </Backdrop>
      </div>
    );
  }
  return (
    <form className={classes.textField} noValidate autoComplete='off'>
      <FormControl>
        <TextField
          label='Location'
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          variant='filled'
        />
      </FormControl>
      <FormControl variant='filled'>
        <TextField
          type='datetime-local'
          label='Start'
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          variant='filled'
          pattern='[0-9]{4}-[0-9]{2}T[0-9]{2}:[0-9]{2}'
        />
      </FormControl>
      <FormControl variant='filled'>
        <TextField
          type='datetime-local'
          label='End'
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          variant='filled'
        />
      </FormControl>
      <FormControl variant='filled'>
        <TextField
          label='Group Size'
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          variant='filled'
        />
      </FormControl>
    </form>
  );
}
