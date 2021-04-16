/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  endOfDay, startOfDay, lightFormat, parseISO,
} from 'date-fns';
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
      borderRadius: '5px',
    },
  },
  searchIcon: {
    '& .MuiIconButton-root': {
      backgroundColor: '#dc004e',
      borderRadius: '50px',
      color: 'white',
      margin: theme.spacing(1),
      textDecoration: 'inherit',
    },
  },
  searchIconError: {
    '& .MuiIconButton-root': {
      backgroundColor: 'grey',
      borderRadius: '50px',
      color: 'white',
      margin: theme.spacing(1),
      textDecoration: 'inherit',
    },
  },
}));

export default function GuideSearch(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(startOfDay(new Date()));
  const [startVisDate, setStartVisDate] = useState();
  const [endDate, setEndDate] = useState(endOfDay(new Date()));
  const [endVisDate, setEndVisDate] = useState();
  const [groupSize, setGroupSize] = useState(0);

  useEffect(() => {
    setLoading(false);
    setStartVisDate(lightFormat(startDate, 'yyyy-MM-dd'));
    setEndVisDate(lightFormat(endDate, 'yyyy-MM-dd'));
  }, [0]);

  const handleLocationChange = (local) => {
    setLocation(local.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(startOfDay(parseISO(date.target.value)));
  };

  const handleEndDateChange = (date) => {
    setEndDate(endOfDay(parseISO(date.target.value)));
  };

  const handleGroupSizeChange = (size) => {
    setGroupSize(size.target.value);
  };

  const submitFormChanges = () => {
    props.changeSearchParams(location, startDate, endDate, groupSize);
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
    <form className={classes.textField} noValidate autoComplete='off'>
      <FormControl variant='filled'>
        <TextField
          required
          label='Location'
          onChange={handleLocationChange}
          margin='normal'
          variant='filled'
          placeholder='Enter State, i.e. Colorado'
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
      <FormControl variant='filled'>
        {startDate >= startOfDay(new Date())
          ? (
            <TextField
              required
              type='date'
              label='Start Date Range'
              onChange={handleStartDateChange}
              defaultValue={startVisDate}
              margin='normal'
              variant='filled'
              InputLabelProps={{
                shrink: true,
              }}
            />
          ) : (
            <TextField
              required
              type='date'
              error
              label='Start Date Range'
              onChange={handleStartDateChange}
              defaultValue={startVisDate}
              margin='normal'
              variant='filled'
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}

      </FormControl>
      <FormControl variant='filled'>
        {endDate < startDate
          ? (
            <TextField
              required
              error
              type='date'
              label='End Date Range'
              onChange={handleEndDateChange}
              defaultValue={endVisDate}
              margin='normal'
              variant='filled'
              InputLabelProps={{
                shrink: true,
              }}
            />
          )
          : (
            <TextField
              required
              type='date'
              label='End Date Range'
              onChange={handleEndDateChange}
              defaultValue={endVisDate}
              margin='normal'
              variant='filled'
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
      </FormControl>
      <FormControl variant='filled'>
        <TextField
          label='Group Size'
          onChange={handleGroupSizeChange}
          margin='normal'
          variant='filled'
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
      {(endDate > startDate && location !== '' && startDate >= startOfDay(new Date()))
        ? (
          <FormControl
            className={classes.searchIcon}
            onClick={submitFormChanges}
            component={Link}
            to='/results'
          >
            <IconButton aria-label='search for guides'>
              <SearchIcon />
            </IconButton>
          </FormControl>
        )
        : (
          <FormControl className={classes.searchIconError}>
            <IconButton aria-label='unable to search for guides'>
              <SearchIcon />
            </IconButton>
          </FormControl>
        )}
    </form>
  );
}
