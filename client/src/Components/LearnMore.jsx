import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import Image from '../../dist/background9.jpg';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundImage: `url(${Image})`,
        margin: '2em',
        maxHeight: '20%',
        minHeight: '20%',
        borderRadius: '14px',
        padding: '5em'
    },
    buffer: {
        padding: '1em',
    },
    loc: {
        margin: '3em 0em',
    }
  }));
  
export default function LearnMore() {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <React.Fragment>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item className={classes.buffer}>
                                <Typography variant="h5">
                                    Want to join AdveNew?
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='p'>
                                    Take advantage of AdveNew's marketplace, landing pages, and scheduler.
                                </Typography>
                                <br/>
                                <Typography variant='p'>
                                    Take your business to the next level.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.loc}>
                            <Button variant="contained" size="large">Learn More</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        </div>
    );
  }
  