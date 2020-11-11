import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App.jsx';

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
renderMethod(<App />, document.getElementById('root'));
