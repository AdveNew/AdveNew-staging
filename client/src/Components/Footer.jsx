/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { CircularProgress, Backdrop } from '@material-ui/core';

export default function Footer() {
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
      Footer Goodness Holder
    </React.Fragment>
  );
}
