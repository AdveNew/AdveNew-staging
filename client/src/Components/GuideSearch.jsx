/* eslint-disable import/extensions */
import React, {
  useState, useEffect, useMemo, forwardRef, createRef,
} from 'react';
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
import SearchResults from './SearchResults.jsx';

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
    '& .MuiIconButton-root': {
      backgroundColor: '#dc004e',
      borderRadius: '50px',
      color: 'white',
      margin: theme.spacing(1),
      textDecoration: 'inherit',
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
    console.log(endDate);
    if (endDate < startDate) {
      console.log('End date before start date, please change');
      setEndDate(endOfDay(startDate));
      console.log(endDate);
    }
  };

  const handleGroupSizeChange = (size) => {
    setGroupSize(size.target.value);
  };

  const searchLink = useMemo(
    () => forwardRef((props, ref) => (
      <Link
        ref={ref}
        to={{
          pathname: '/results',
          state: {
            location: { location },
            startDate: { startDate },
            endDate: { endDate },
            size: { groupSize },
          },
        }}
      />
    )),
  );

  const ref = createRef();

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
      <FormControl
        props={startDate}
        className={classes.searchIcon}
        ref={ref}
        component={searchLink}
      >
        <IconButton aria-label='search for guides'>
          <SearchIcon />
        </IconButton>
      </FormControl>
    </form>
  );
}
