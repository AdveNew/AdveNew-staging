import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import will_image from '../../dist/will.png';
import nick_image from '../../dist/nick.png';
import neel_image from '../../dist/neel.png';
import jacob_image from '../../dist/jacob.png';
import josh_image from '../../dist/josh.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1000,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function AboutUs() {
  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={6}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div>
        <Typography>
            Welcome to the Advenew marketplace. We are a company that is looking to make getting into the outdoors easier for everyone. Our marketplace will make the process to book guides seamless.
        </Typography>
        <Typography display="block">
            Our team is composed of adventurous computer science majors. We are dedicated to helping customers find guide shops and increasing the efficiency of the businesses we work with.
        </Typography>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
        >
            <Grid item>
                <Paper>
                    <img className={classes.img} alt="Will Culkin" src={will_image} width="150px" height="150px"/>
                    <Typography align='center' component="span" color="textPrimary">
                        Will Culkin
                    </Typography>
                    <Typography display="block" className={classes.inline} color="textPrimary">
                        CEO
                    </Typography>
                </Paper>
            </Grid>
            <Grid item>
                <Paper>
                    <img className={classes.img} alt="Nick Julander" src={nick_image} width="150px" height="150px"/>
                    <Typography component="span" className={classes.inline} color="textPrimary">
                        Nick Julander
                    </Typography>
                    <Typography display="block" className={classes.inline} color="textPrimary">
                        CTO
                    </Typography>
                </Paper>
            </Grid>
            <Grid item>
                <Paper>
                    <img className={classes.img} alt="Neel Katuri" src={neel_image} width="150px" height="150px"/>
                    <Typography component="span" className={classes.inline} color="textPrimary">
                        Neel Katuri
                    </Typography>
                    <Typography display="block" className={classes.inline} color="textPrimary">
                        CMO
                    </Typography>
                </Paper>
            </Grid>
            <Grid item>
                <Paper>
                    <img className={classes.img} alt="Jacob Reed" src={jacob_image} width="150px" height="150px"/>
                    <Typography component="span" className={classes.inline} color="textPrimary">
                        Jacob Reed
                    </Typography>
                    <Typography display="block" className={classes.inline} color="textPrimary">
                        CRO
                    </Typography>
                </Paper>
            </Grid>
            <Grid item>
                <Paper>
                    <img className={classes.img} alt="Josh Miltier" src={josh_image} width="150px" height="150px"/>
                    <Typography component="span" className={classes.inline} color="textPrimary">
                        Josh Miltier
                    </Typography>
                    <Typography display="block" className={classes.inline} color="textPrimary">
                        CXO
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    </div>
  );
}
