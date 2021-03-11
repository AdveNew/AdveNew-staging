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
  const [location, setLocation] = useState('Virginia');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().getTime() + (10 * 24 * 3600000)));
  const [groupSize, setGroupSize] = useState(0);

  // get a random company for now
  const storeId = Math.floor(Math.random() * 100 + 1);
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
      <Header />
      <Grid
        container
        direction='row'
        justify='space-evenly'
        alignItems='center'
      >
        <Switch>
          <Route path='/' component={() => <Home searchParams={handleStateChanges} />} exact />
          <Route path='/c1' component={() => <CompanyPage store={store} isAuthed />} />
          <Route path='/results' component={() => <SearchResults location={location} startDate={startDate} endDate={endDate} groupSize={groupSize} />} />
          <Route component={NotFound} />
        </Switch>
      </Grid>
      <Footer store={store} />
    </div>
  );
}
