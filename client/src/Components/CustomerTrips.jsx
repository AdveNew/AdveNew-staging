import React, {useState, useEffect} from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

export default function CustomerTrips() {
    const [trips, setTrips] = useState([]);
    const useStyles = makeStyles(() => ({
        header: {
            margin: '10%',
        },
        cardContainer: {
            margin: '20%',
            flexDirection: 'col',
            overflowX: 'auto'
        }
    }));
    const classes = useStyles();
    const customerEmail = JSON.parse(localStorage.getItem('user.email'));
    axios.get('api/trips', {
        params: {
            customerEmail,
        },
    })
    .then(res => {
        setTrips(res.data.trips);
    });
    const det = trips[0]['details'];
    console.log(det);
    return(
        <React.Fragment>
            <Grid container direction="column" justify="space-evenly" alignItems="center" >
                <Grid item className={classes.header}>
                    <Typography variant="h4">

                        

                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}