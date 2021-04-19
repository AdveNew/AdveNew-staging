import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid/Grid.js';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress.js';
import Backdrop from '@material-ui/core/Backdrop/Backdrop.js';
import axios from 'axios';

// Components
import Header from './Header.jsx';
import Home from './Home.jsx';
import SearchResults from './SearchResults.jsx';
import CompanyPage from './CompanyPage.jsx';
// import Footer from './Footer.jsx';
import NotFound from './NotFound.jsx';
import CustomerSettings from './CustomerSettings.jsx';
import CompanySettings from './CompanySettings.jsx';
import CustomCalendar from './CustomCalendar.jsx';
import AboutUs from './AboutUs.jsx';
import CustomerTrips from './CustomerTrips.jsx';

export default function App() {
  const isAuthed = (JSON.parse(localStorage.getItem('user.token')) !== null);
  const loginType = localStorage.getItem('user.loginType');
  const [store, setStore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('Colorado');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().getTime() + (90 * 864e5)));
  const [groupSize, setGroupSize] = useState(0);
  const [buttonState, setButtonState] = useState(1);

  // get first store for now
  const storeEmail = JSON.parse(localStorage.getItem('user.email'));
  useEffect(() => {
    axios.get('api/calendar', {
      params: {
        storeEmail,
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
          <Route path='/calendar' component={() => <CustomCalendar store={store} calendar={store.calendar} isAuthed />} />
          <Route path='/trips' component={() => <CustomerTrips />} />

          {isAuthed && (loginType === 'Shop')
            ? <Route path='/calendar' component={() => <CustomCalendar store={store} calendar={store.calendar} isAuthed />} />
            : null}
          <Route path='/about' component={() => <AboutUs />} />

          {isAuthed && (loginType === 'Customer' || loginType === 'Guide')
            ? <Route path='/profile' component={() => <CustomerSettings />} />
            : null}
          {isAuthed && (loginType === 'Shop')
            ? <Route path='/company_profile' component={() => <CompanySettings />} />
            : null}
          <Route component={NotFound} />
        </Switch>
      </Grid>
      {/* <Footer store={store} bs={buttonState} setButtonState={handleButtonStateChange} /> */}
    </div>
  );
}
