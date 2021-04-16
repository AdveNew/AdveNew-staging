import React, {useState, useEffect} from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles({
  resultGrid: {
    backgroundColor: 'white',
    borderBottom: 0,
    display: 'flex',
    marginTop: '10px',
    minHeight: '600px',
    maxHeight: '1200px',
    maxWidth: '100%',
    padding: '10px',
  },



});

export default function CustomerTrips() {
    const classes = useStyles();
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
    // console.log(trips)
    // trip.calendar.startDate
    
    return(
      <div> </div>
    );
}