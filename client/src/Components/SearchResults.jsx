/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CircularProgress,
  Backdrop,
  Container,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  resultGrid: {
    backgroundColor: 'white',
    borderBottom: 0,
    flexGrow: 1,
    float: 'left',
    height: 'auto',
    marginTop: '50px',
    minHeight: '600px',
    maxHeight: '2000px',
    maxWidth: '60%',
    padding: '10px',
  },
}));

export default function SearchResults(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [location] = useState('New Ewald, New York');
  const [startDate] = useState(new Date());
  const [endDate] = useState(new Date());
  const [groupSize] = useState(1);
  const [rows, setRows] = useState([{
    id: 1, name: 'error', location: 'error', startDate: new Date(), size: -1,
  }]);

  const columns = [
    { field: 'guide', headerName: 'Guide\'s Name' },
    { field: 'location', headerName: 'Location' },
    {
      field: 'startDate', headerName: 'Date', type: 'date',
    },
    {
      field: 'groupSize', headerName: 'Group Size', type: 'number',
    },
    {
      field: 'experience', headerName: 'Experience',
    },
  ];

  useEffect(() => {
    axios.get('api/search', {
      params: {
        location,
        startDate,
        endDate,
        size: groupSize,
      },
    })
      .then((res) => {
        console.log(res.data.searchResults);
        setRows(res.data.searchResults.calendar);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Error: ${err.message}`);
        setLoading(false);
      });
  }, [0]);

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
    <DataGrid className={classes.resultGrid} rows={rows} columns={columns} />
  );
}
