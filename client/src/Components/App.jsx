import React from 'react';
import axios from 'axios';
import CustomCalendar from './CustomCalendar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      store: [],
      loading: true,
    };
  }

  componentDidMount() {
    const storeId = Math.floor(Math.random() * 100 + 1);
    axios.get('api/calendar', {
      params: {
        storeId,
      },
    })
      .then((res) => {
        this.setState({
          store: res.data.store,
          loading: false,
        });
      })
      .catch((err) => console.error(err.message));
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading data...</h1>;
    }
    return (
      <div className='body'>
        <h2>Company Name: {this.state.store.name}</h2>
        <div className='custom-calendar'>
          <CustomCalendar />
        </div>
      </div>
    );
  }
}

export default App;
