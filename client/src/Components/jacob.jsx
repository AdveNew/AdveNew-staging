/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { CircularProgress, Backdrop } from '@material-ui/core';
/* eslint-disable import/extensions */
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({
  jacob: {
    top: 'auto',
    bottom: 0,
    color: 'red',
  },
}));

export default function Jacob() {
  const classes = useStyles();
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
    // eslint-disable-next-line react/jsx-fragments
    <React.Fragment>
      <Paper className={classes.jacob}>
        jacob
      </Paper>
    </React.Fragment>
  );
}
