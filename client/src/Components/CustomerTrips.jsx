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
import { Calendar } from 'devextreme-react';

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

    useEffect(() => {
        axios.get('api/trips', {
            params: {
                customerEmail,
            },
        })
        .then(res => {
            setTrips(res.data.trips);
            
        })
        .catch((err) => console.error(err.message));
    }, [0]);

    
  

    console.log(trips)
    return(
      trips.map((trip) =>
        
        
    <Card className={classes.root}>
      
  <CardContent>
    <Typography className={classes.title} color="textSecondary" gutterBottom>
      
    </Typography>
    <Typography variant="h5" component="h2">
      {trip.emailAddress}
    </Typography>
    <Typography className={classes.pos} color="textSecondary">
      {trip.calendar.startDate}
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
  )
    );
}