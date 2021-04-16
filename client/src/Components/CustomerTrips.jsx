import React, {useState, useEffect} from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Grid from '@material-ui/core/Grid';

import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CustomerTrips() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [trips, setTrips] = useState([]);
    
    const customerEmail = JSON.parse(localStorage.getItem('user.email'));
    axios.get('api/trips', {
        params: {
            customerEmail,
        },
    })
    .then(res => {
        setTrips(res.data.trips);
        
    });
    return(
        
        <Card className={classes.root}>
            
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="h2">
            be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    
    );
}