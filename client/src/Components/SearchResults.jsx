/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  Backdrop,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
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

export default function SearchResults(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [startVisDate, setStartVisDate] = useState();
  const [endDate, setEndDate] = useState(new Date());
  const [endVisDate, setEndVisDate] = useState();

  console.log(props);

  useEffect(() => {
    setLoading(false);
    setStartVisDate(`${startDate.getFullYear()}-${(startDate.getMonth() > 8) ? (startDate.getMonth() + 1) : (`0${startDate.getMonth() + 1}`)}-${(startDate.getDate() > 9) ? startDate.getDate() : (`0${startDate.getDate()}`)}`);
    setEndVisDate(`${endDate.getFullYear()}-${(endDate.getMonth() > 8) ? (endDate.getMonth() + 1) : (`0${endDate.getMonth() + 1}`)}-${(endDate.getDate() > 9) ? endDate.getDate() : (`0${endDate.getDate()}`)}`);
  }, [0]);

  const handleStartDateChange = (date) => {
    setStartDate(new Date(date.target.value));
  };

  const handleEndDateChange = (date) => {
    setEndDate(date.target.value);
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
    <h1>RESULTS</h1>
  );
}
