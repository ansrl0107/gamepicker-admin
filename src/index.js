import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'typeface-roboto';

import Login from './pages/Login';
const token = sessionStorage.getItem('token');
console.log(token);

if (token) {
    ReactDOM.render(<App />, document.getElementById('root'));
} else {
    ReactDOM.render(<Login />, document.getElementById('root'));
}
