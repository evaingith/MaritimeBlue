import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App.js';
import * as serviceWorker from './components/serviceWorker.js';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();