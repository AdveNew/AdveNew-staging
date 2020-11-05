import React from 'react';
// import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      store: [],
    };
  }

  componentDidMount() {
    const randomStore = Math.floor(Math.random() * 100 + 1);
    axios.get('/api/calendar',
    )
  }

  render() {
    return (
      <div className='body'>
        <h1>In React App</h1>
      </div>
    );
  }
}

export default App;
