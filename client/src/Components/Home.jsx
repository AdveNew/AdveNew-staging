/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  Backdrop,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GuideSearch from './GuideSearch.jsx';
import Image from '../../dist/background9.jpg';

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${Image})`,
    height: '75vh',
    width: '110%',
    backgroundPosition: '10% 10%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    marginTop: '-70px',
    zIndex: '0',
  },
  text: {
    zIndex: '2',
    position: 'relative',
    backgroundColor: 'none',
    marginTop: '15%',
  },
  textField: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
      backgroundColor: 'white',
      flex: 1,
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [0]);

  if (loading) {
    // return (<h1>Loading data...</h1>);
    return (
      <div className='loading'>
        <Backdrop open>
          <CircularProgress color='inherit' />
        </Backdrop>
      </div>
    );
  }
  return (
    // eslint-disable-next-line react/jsx-fragments
    <React.Fragment>
      <div className={classes.background}>
        <Grid
          container
          direction='column'
          justify='space-evenly'
          alignItems='center'
        >
          <div className={classes.text}>
            <GuideSearch />
          </div>
        </Grid>
      </div>
    </React.Fragment>
  );
}
