import React from 'react';
import { makeStyles } from '@material-ui/core/styles/index.js';
import {
  Container, Divider, Grid, ListItem, Paper, Typography,
} from '@material-ui/core';
import {
  ArrowForward, EventAvailable, FilterHdr, Search,
} from '@material-ui/icons';
import willImage from '../../dist/will.png';
import nickImage from '../../dist/nick.png';
import neelImage from '../../dist/neel.png';
import jacobImage from '../../dist/jacob.png';
import joshImage from '../../dist/josh.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '70px',
    padding: '10px',
  },
  divider: {
    backgroundColor: theme.palette.primary.light,
    height: '4px',
    margin: 'auto',
    marginBottom: '50px',
    marginTop: '45px',
    width: '90%',
  },
  icon: {
    fontSize: '100px',
    marginTop: '30px',
  },
  iconSmall: {
    fontSize: '50px',
    margin: '30px',
  },
  image: {
    width: 150,
    height: 150,
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  listItem: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 'auto',
  },
  paper: {
    padding: '5px',
    paddingTop: '15px',
    marginTop: '15px',
  },
}));

export default function AboutUs() {
  const classes = useStyles();

  return (
    <Container maxWidth='md' className={classes.root}>
      <Typography align='center' paragraph variant='h3'>
        Welcome to the <strong>AdveNew</strong> marketplace.
      </Typography>
      <Typography align='center' paragraph variant='h4'>
        We are a company that is looking to make getting into the
        outdoors easier for everyone. Our marketplace will make
        the process to book guides seamless.
      </Typography>
      <Grid container direction='row' justify='center' alignItems='center'>
        <ListItem className={classes.listItem}>
          <Search className={classes.icon} />
          <h2>Search</h2>
        </ListItem>
        <ArrowForward className={classes.iconSmall} />
        <ListItem className={classes.listItem}>
          <EventAvailable className={classes.icon} />
          <h2>Book</h2>
        </ListItem>
        <ArrowForward className={classes.iconSmall} />
        <ListItem className={classes.listItem}>
          <FilterHdr className={classes.icon} />
          <h2>Go</h2>
        </ListItem>
      </Grid>
      <Divider className={classes.divider} />
      <Typography display='block' align='center' paragraph variant='h5'>
        <strong>Our team is composed of adventurous Computer Science majors.</strong>
        <br />
        We are dedicated to helping customers find guide shops and
        increasing the efficiency of the businesses we work with.
      </Typography>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={3}
      >
        <Grid item>
          <Paper className={classes.paper}>
            <img className={classes.image} alt='Will Culkin' src={willImage} />
            <Typography style={{ paddingTop: '10px' }} align='center'>
              <strong>Will Culkin</strong> <br />
              CEO
            </Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <img className={classes.image} alt='Nick Julander' src={nickImage} />
            <Typography style={{ paddingTop: '10px' }} align='center'>
              <strong>Nick Julander</strong> <br />
              CTO
            </Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <img className={classes.image} alt='Neel Katuri' src={neelImage} />
            <Typography style={{ paddingTop: '10px' }} align='center'>
              <strong>Neel Katuri</strong> <br />
              CMO
            </Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <img className={classes.image} alt='Jacob Reed' src={jacobImage} />
            <Typography style={{ paddingTop: '10px' }} align='center'>
              <strong>Jacob Reed</strong> <br />
              CRO
            </Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <img className={classes.image} alt='Josh Miltier' src={joshImage} />
            <Typography style={{ paddingTop: '10px' }} align='center'>
              <strong>Josh Miltier</strong> <br />
              CXO
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
