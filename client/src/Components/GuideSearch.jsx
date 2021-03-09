/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CircularProgress,
  Backdrop,
  FormControl,
  TextField,
  IconButton,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      backgroundColor: 'white',
      borderBottom: 0,
    },
  },
  searchIcon: {
    '& > span': {
      margin: theme.spacing(1),
      backgroundColor: 'antiquewhite',
      borderRadius: '50px',
      fill: 'red',
    },
  },
}));

export default function GuideSearch() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [startVisDate, setStartVisDate] = useState();
  const [endDate, setEndDate] = useState(new Date());
  const [endVisDate, setEndVisDate] = useState();
  const [groupSize, setGroupSize] = useState(0);

  useEffect(() => {
    setLoading(false);
    setStartVisDate(`${startDate.getFullYear()}-${(startDate.getMonth() > 8) ? (startDate.getMonth() + 1) : (`0${startDate.getMonth() + 1}`)}-${(startDate.getDate() > 9) ? startDate.getDate() : (`0${startDate.getDate()}`)}`);
    setEndVisDate(`${endDate.getFullYear()}-${(endDate.getMonth() > 8) ? (endDate.getMonth() + 1) : (`0${endDate.getMonth() + 1}`)}-${(endDate.getDate() > 9) ? endDate.getDate() : (`0${endDate.getDate()}`)}`);
  }, [0]);

  const handleLocationChange = (local) => {
    setLocation(local.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(new Date(date.target.value));
  };

  const handleEndDateChange = (date) => {
    setEndDate(date.target.value);
  };

  const handleGroupSizeChange = (size) => {
    setGroupSize(size.target.value);
  };

  const Results = () => <Link to='/results' />;

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
    <form className={classes.textField} noValidate autoComplete='off'>
      <FormControl variant='filled'>
        <TextField
          label='Location'
          onChange={handleLocationChange}
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          variant='filled'
        />
      </FormControl>
      <FormControl variant='filled'>
        <TextField
          type='date'
          label='Start Date'
          onChange={handleStartDateChange}
          defaultValue={startVisDate}
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          variant='filled'
        />
      </FormControl>
      <FormControl variant='filled'>
        <TextField
          type='date'
          label='End Date'
          onChange={handleEndDateChange}
          defaultValue={endVisDate}
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
          onChange={handleGroupSizeChange}
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          variant='filled'
        />
      </FormControl>
      <FormControl color='primary' className='searchIcon'>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </FormControl>
    </form>
  );
}
