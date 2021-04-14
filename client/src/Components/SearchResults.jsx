/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CircularProgress,
  Backdrop,
  Button,
  Drawer,
} from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Payment from './Payment.jsx';
import GuideSearch from './GuideSearch.jsx';
import CompanyInfo from './CompanyInfo.jsx';

const useStyles = makeStyles((theme) => ({
  resultGrid: {
    backgroundColor: 'white',
    borderBottom: 0,
    display: 'flex',
    marginTop: '10px',
    minHeight: '600px',
    maxHeight: '1200px',
    maxWidth: '100%',
    padding: '10px',
  },
  root: {
    flexDirection: 'column',
    '& .ant-empty-img-1': {
      fill: theme.palette.type === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
      fill: theme.palette.type === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
      fill: theme.palette.type === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
      fill: theme.palette.type === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
      fillOpacity: theme.palette.type === 'light' ? '0.8' : '0.08',
      fill: theme.palette.type === 'light' ? '#f5f5f5' : '#fff',
    },
  },
  label: {
    marginTop: theme.spacing(1),
  },
}));

export default function SearchResults(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const [location] = useState(props.location);
  const [startDate] = useState(props.startDate);
  const [endDate] = useState(props.endDate);
  const [groupSize] = useState(props.groupSize || 1);
  const [store, setStore] = useState();
  const [rows, setRows] = useState([{
    id: 1, name: 'error', location: 'error', startDate: new Date(), size: -1,
  }]);

  const gotoShop = (id) => {
    axios.get('api/shopByCalId', {
      params: {
        id,
      },
    })
      .then((res) => {
        setStore(res.data.store);
        setDrawer(true);
      })
      .catch((err) => console.error(err.message));
  };

  const columns = [
    { field: 'guide', headerName: 'Guide\'s Name', flex: 0.8 },
    { field: 'location', headerName: 'Location', flex: 0.8 },
    {
      field: 'startDate',
      headerName: 'Date',
      type: 'date',
      flex: 0.8,
      renderCell: (d) => format(parseISO(d.value), 'EEE MMM-dd'),
    },
    {
      field: 'time',
      headerName: 'Time',
      type: 'time',
      flex: 1.2,
      renderCell: (s) => (
        format(parseISO(s.row.startDate), 'h:mm a - ').concat(format(parseISO(s.row.endDate), 'h:mm a'))
      ),
    },
    { field: 'groupSize', headerName: 'Group Size', flex: 0.8 },
    { field: 'experience', headerName: 'Experience', flex: 0.8 },
    {
      field: 'book',
      headerName: 'Book',
      flex: 0.6,
      renderCell: (e) => {
        // eslint-disable-next-line no-underscore-dangle
        return <Payment guideName={e.row.guide} price={e.row.price} calendarId={e.row._id} />
      },
    },
    {
      field: 'shop',
      headerName: 'Guide Shop',
      flex: 0.8,
      renderCell: (id) => (
        // eslint-disable-next-line no-underscore-dangle
        <Button onClick={() => gotoShop(id.row._id)}>View</Button>
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
      })
      .catch((err) => {
        console.error(`Error: ${err.message}`);
      })
      .finally(() => setLoading(false));
  }, [0]);

  function CustomNoRowsOverlay() {
    return (
      <GridOverlay className={classes.root}>
        <svg
          width='120'
          height='100'
          viewBox='0 0 184 152'
          aria-hidden
          focusable='false'
        >
          <g fill='none' fillRule='evenodd'>
            <g transform='translate(24 31.67)'>
              <ellipse
                className='ant-empty-img-5'
                cx='67.797'
                cy='106.89'
                rx='67.797'
                ry='12.668'
              />
              <path
                className='ant-empty-img-1'
                d='M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z'
              />
              <path
                className='ant-empty-img-2'
                d='M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z'
              />
              <path
                className='ant-empty-img-3'
                d='M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z'
              />
            </g>
            <path
              className='ant-empty-img-3'
              d='M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z'
            />
            <g className='ant-empty-img-4' transform='translate(149.65 15.383)'>
              <ellipse cx='20.654' cy='3.167' rx='2.849' ry='2.815' />
              <path d='M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z' />
            </g>
          </g>
        </svg>
        <div className={classes.label}>
          No Guides Available for the specified criteria.
        </div>
      </GridOverlay>
    );
  }

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
    <div style={{ flexGrow: 1, marginTop: '20px' }}>
      <GuideSearch changeSearchParams={props.searchParams} />
      <DataGrid
        density='compact'
        className={classes.resultGrid}
        key={rows.id}
        rows={rows}
        columns={columns}
        sortModel={[{
          field: 'startDate',
          sort: 'asc',
        }]}
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
      <Drawer open={drawer} onClose={() => setDrawer(false)}>
        <CompanyInfo store={store} />
      </Drawer>;
    </div>
  );
}
