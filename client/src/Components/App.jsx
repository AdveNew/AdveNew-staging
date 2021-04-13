/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import axios from 'axios';

// Components
import Header from './Header.jsx';
import Home from './Home.jsx';
import SearchResults from './SearchResults.jsx';
import CompanyPage from './CompanyPage.jsx';
import Footer from './Footer.jsx';
import NotFound from './NotFound.jsx';

export default function App() {
  const [store, setStore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('Colorado');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().getTime() + (90 * 864e5)));
  const [groupSize, setGroupSize] = useState(0);
  const [buttonState, setButtonState] = useState(1);

  // get first store for now
  const storeId = 1;
  useEffect(() => {
    axios.get('api/calendar', {
      params: {
        storeId,
      },
    })
      .then((res) => {
        setStore(res.data.store);
        setLoading(false);
      })
      .catch((err) => console.error(err.message));
  }, [0]);

  const handleStateChanges = (l, s, e, g) => {
    setLocation(l);
    setStartDate(s);
    setEndDate(e);
    setGroupSize(g);
  };

  const handleButtonStateChange = (b) => {
    setButtonState(b);
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
    <div>
      <Header sb={handleButtonStateChange} bs={buttonState} />
      <Grid
        container
        direction='row'
        justify='space-evenly'
        alignItems='center'
        color='primary'
      >
        <Switch>
          <Route path='/' component={() => <Home searchParams={handleStateChanges} />} exact />
          <Route path='/shop' component={() => <CompanyPage store={store} isAuthed />} />
          <Route path='/results' component={() => <SearchResults location={location} startDate={startDate} endDate={endDate} groupSize={groupSize} searchParams={handleStateChanges} />} />
          <Route path='/about' />
          <Route component={NotFound} />
        </Switch>
      </Grid>
      <Footer store={store} bs={buttonState} setButtonState={handleButtonStateChange} />
    </div>
  );
}
