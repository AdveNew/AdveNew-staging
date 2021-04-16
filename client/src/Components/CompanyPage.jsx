/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

// Components
import CompanyInfo from './CompanyInfo.jsx';
import CustomCalendar from './CustomCalendar.jsx';

export default function CompanyPage(props) {
  const [store] = useState(props.store);
  const [calendar] = useState(props.store.calendar);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
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
    <div>
      <Grid
        container
        direction='row'
        justify='space-evenly'
        alignItems='center'
        style={{ marginTop: '50px' }}
      >
        <CompanyInfo store={store} />
        <CustomCalendar calendar={calendar} store={store} />
      </Grid>
    </div>
  );
}
