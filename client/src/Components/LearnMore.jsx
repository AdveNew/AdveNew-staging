/* eslint-disable import/extensions */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: 'rgb(3, 123, 209)',
    margin: '2em',
    maxHeight: '20%',
    minHeight: '20%',
    borderRadius: '14px',
    padding: '5em',
    color: 'white',
  },
  buffer: {
    padding: '10px',
  },
  loc: {
    marginTop: '3em',
  },
}));

export default function LearnMore() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid item xs container direction='column' spacing={2}>
              <Grid item className={classes.buffer}>
                <Typography variant='h5'>
                  <strong>
                    Want to join AdveNew?
                  </strong>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='p'>
                  <strong>
                    Take advantage of AdveNew&lsquo;s marketplace, landing pages, and scheduler.
                  </strong>
                </Typography>
                <br />
                <Typography variant='p'>
                  <strong>
                    Take your business to the next level.
                  </strong>
                </Typography>
              </Grid>
            </Grid>
            <Grid item className={classes.loc}>
              <Button
                variant='contained'
                size='large'
                // eslint-disable-next-line no-return-assign
                onClick={() => window.location.href = 'mailto:customercare@advenew.com?subject=Hey AdveNew'}
              >
                Learn More
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    </div>
  );
}
