/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import axios from 'axios';

// Components
import Header from './Header.jsx';
import Home from './Home.jsx';
import SearchResults from './SearchResults.jsx';
import CompanyPage from './CompanyPage.jsx';
import Footer from './Footer.jsx';
import NotFound from './NotFound.jsx';

export default function App() {
  const [store, setStore] = useState([]);
  const [loading, setLoading] = useState(true);

  // get a random company for now
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
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/c1' component={() => <CompanyPage store={store} isAuthed />} />
          <Route path='/results' component={() => <SearchResults />} />
          <Route component={NotFound} />
        </Switch>
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
