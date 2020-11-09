import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomCalendar from './CustomCalendar.jsx';

function App() {
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
    return <h1>Loading data...</h1>;
  }
  return (
    <div className='body'>
      <h2 className='header'>Company Name: {store.name}</h2>
      <span>{store.phrase}</span>
      <h3>
        Company Hours: {store.hours} &nbsp;
        Website: {store.websiteUrl}
      </h3>
      <h3>
        Phone: {store.phoneNumber} &nbsp;
        Email: {store.emailAddress}
      </h3>
      <div className='custom-calendar'>
        <CustomCalendar calendar={store.calendar} />
      </div>
    </div>
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

export default App;
