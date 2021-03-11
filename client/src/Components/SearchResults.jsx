/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CircularProgress,
  Backdrop,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Payment from './Payment.jsx';

const useStyles = makeStyles(() => ({
  resultGrid: {
    backgroundColor: 'white',
    borderBottom: 0,
    display: 'flex',
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
  const [location] = useState(props.location);
  const [startDate] = useState(props.startDate);
  const [endDate] = useState(props.endDate);
  const [groupSize] = useState(props.groupSize);
  const [rows, setRows] = useState([{
    id: 1, name: 'error', location: 'error', startDate: new Date(), size: -1,
  }]);

  const columns = [
    { field: 'guide', headerName: 'Guide\'s Name', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    {
      field: 'startDate', headerName: 'Date', type: 'dateTime', flex: 1,
    },
    { field: 'groupSize', headerName: 'Group Size', flex: 0.6 },
    { field: 'experience', headerName: 'Experience', flex: 0.8 },
    {
      field: 'book',
      headerName: 'Book',
      flex: 0.6,
      renderCell: () => (
        <Payment price='100' />
      ),
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
        setRows(res.data.results);
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
    <div style={{ flexGrow: 1 }}>
      <DataGrid className={classes.resultGrid} rows={rows} columns={columns} />
    </div>
  );
}
