/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import axios from 'axios';

// Components
import CompanyInfo from './CompanyInfo.jsx';
import CustomCalendar from './CustomCalendar.jsx';
// import CustomCalendar2 from './CustomCalendar2.jsx';
// import NotFound from './404.jsx';
import { Header, Footer } from './AppBars.jsx';

export default function App() {
  const [store, setStore] = useState([]);
  const [loading, setLoading] = useState(true);

  const storeId = Math.floor(Math.random() * 100 + 1);
  useEffect(() => {
    axios.get('api/calendar', {
      params: {
        storeId,
      },
    })
      .then((res) => {
        setStore(res.data.store);
        setLoading(false);
      })
      .catch((err) => console.error(err.message));
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
      <Header />
      <Grid
        container
        direction='row'
        justify='space-evenly'
        alignItems='center'
      >
        {/* <Router>
          <Switch>
            <Route path='/'><LaunchPage store={store} /></Route>
            <Route path='/c1'><CustomCalendar calendar={store.calendar} /></Route>
            <Route path='/c2'>
              <CustomCalendar2 calendar={store.calendar} />
            </Route>
            <Route path='*' component={NotFound} />
          </Switch>
        </Router> */}
        <CompanyInfo store={store} />
        <CustomCalendar calendar={store.calendar} />
      </Grid>
      <Footer store={store} />
    </React.Fragment>
  );
}

// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       store: [],
//       loading: true,
//     };
//   }

//   componentDidMount() {
//     const storeId = Math.floor(Math.random() * 100 + 1);
//     axios.get('api/calendar', {
//       params: {
//         storeId,
//       },
//     })
//       .then((res) => {
//         this.setState({
//           store: res.data.store,
//           loading: false,
//         });
//       })
//       .catch((err) => console.error(err.message));
//   }

//   render() {
//     if (this.state.loading) {
//       return <h1>Loading data...</h1>;
//     }
//     return (
//       <div className='body'>
//         <h2>Company Name: {this.state.store.name}</h2>
//         <div className='custom-calendar'>
//           <CustomCalendar store={this.state.store} />
//         </div>
//       </div>
//     );
//   }
// }
