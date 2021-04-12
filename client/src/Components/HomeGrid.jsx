/* eslint-disable import/extensions */
import React, { useState, useEffect, Fragment } from 'react';
import {
  Backdrop,
  Card,
  CircularProgress,
} from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(() => ({
//   text: {
//     zIndex: '2',
//     position: 'relative',
//     backgroundColor: 'none',
//     marginTop: '15%',
//   },
// }));

export default function HomeGrid() {
  // const classes = useStyles();
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
    <>
      <Card>
        <Card.Header>Reviews</Card.Header>
        <Card.Body>
          <Card.Title>Sarah from Boulder, CO</Card.Title>
          <Card.Text>Blah</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
