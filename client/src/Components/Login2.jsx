/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  Backdrop,
  Grid,
  gutterBottom,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../dist/background9.jpg';

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${Image})`,
    height: '75vh',
    width: '110%',
    backgroundPosition: '10% 10%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    marginTop: '-70px',
    zIndex: '0',
  },
  text: {
    gutterBottom,
    zIndex: '2',
    position: 'relative',
    backgroundColor: 'none',
    marginTop: '15%',
  },
  textField: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
      backgroundColor: 'white',
      flex: 1,
    },
  },
}));

export default function Login() {
  const classes = useStyles();
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
      <div>
        <Grid
          container
          direction='column'
          justify='space-evenly'
          alignItems='center'
        >
          <div className={classes.text}>
            <form>
                <h3>Log In</h3>
                <label>Email</label>
                <div>
                    <input className={classes.textField} type="email" placeholder="Enter email"/>
                </div>
                <label>Password</label>
                <div>
                    <input className={classes.textField} type="password" placeholder="Enter password"/>
                </div>
                <div>
                    <input className={classes.textField} type="checkbox" id="checkRemember"/>
                    <label htmlFor="checkRemember">Remember Me</label> 
                </div>
                <button type="submit">Sign In</button>
                <p>
                    Forgot <a href='#'>password</a>
                </p>  
            </form>
          </div>
        </Grid>
      </div>
    </React.Fragment>
  );
}



// import React, { Component } from "react";
// import {
//     CircularProgress,
//     Backdrop,
//     Grid,
//     gutterBottom,
// } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// // import GuideSearch from './GuideSearch.jsx';
// import Image from '../../dist/background9.jpg';
// // import Jacob from './jacob.jsx';

// const useStyles = makeStyles((theme) => ({
//     background: {
//     backgroundImage: `url(${Image})`,
//     height: '75vh',
//     width: '110%',
//     backgroundPosition: '10% 10%',
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//     marginTop: '-70px',
//     zIndex: '0',
//     },
//     text: {
//         gutterBottom,
//         zIndex: '2',
//         position: 'relative',
//         backgroundColor: 'none',
//         marginTop: '15%',
//     },
//     textField: {
//         '& .MuiTextField-root': {
//         margin: theme.spacing(1),
//         width: '30ch',
//         backgroundColor: 'white',
//         flex: 1,
//         },
//     },
// }));


// export default function Login() {
//     const classes = useStyles();
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//     setLoading(false);
//     }, [0]);

//     if (loading) {
//     // return (<h1>Loading data...</h1>);
//         return (
//             <div className='loading'>
//             <Backdrop open>
//                 <CircularProgress color='inherit' />
//             </Backdrop>
//             </div>
//         );
//     }
//     return (
//         <React.Fragment>
//             <div className={classes.background}>
//                 <Grid
//                     container
//                     direction='column'
//                     justify='space-evenly'
//                     alignItems='center'
//                 >
//                     <div className={classes.text}>
//                         <GuideSearch />
//                     </div>
//                 </Grid>
//             </div>
//         </React.Fragment>
//             /* <form>
//                 <h3>Log in</h3>

//                 <div className="form-group">
//                     <label>Email</label>
//                     <input type="email" className="form-control" placeholder="Enter email" />
//                 </div>

//                 <div className="form-group">
//                     <label>Password</label>
//                     <input type="password" className="form-control" placeholder="Enter password" />
//                 </div>

//                 <div className="form-group">
//                     <div className="custom-control custom-checkbox">
//                         <input type="checkbox" className="custom-control-input" id="customCheck1" />
//                         <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
//                     </div>
//                 </div>

//                 <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
//                 <p className="forgot-password text-right">
//                     Forgot <a href="#">password?</a>
//                 </p>
//             </form> */
//     );
// }
