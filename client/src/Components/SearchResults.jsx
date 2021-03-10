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
  const [location] = useState('');
  const [startDate] = useState(new Date());
  const [endDate] = useState(new Date());
  const [groupSize] = useState(0);
  const [rows, setRows] = useState([{
    id: 1, name: 'test', location: 'there', startDate: new Date(), size: 2,
  }]);

  const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'location', headerName: 'Location' },
    {
      field: 'startDate', headerName: 'Date', type: 'date',
    },
    {
      field: 'size', headerName: 'GroupSize', type: 'number',
    },
  ];

  useEffect(() => {
    setLoading(false);
    // axios.get('api/calendar', {
    //   params: {
    //     location,
    //     startDate,
    //     endDate,
    //     groupSize,
    //   },
    // })
    //   .then((res) => {
    //     setRows(res.data.store);
    //     setLoading(false);
    //   })
    //   .catch((err) => console.error(err.message));
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
