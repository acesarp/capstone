import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Switch, BrowserRouter, Route } from 'react-router-dom';
import UserAddEdit from './components/User/UserAddEdit';
import UserDetails from './components/User/UserDetails';
import Login from './components/Login';
import Signup from './components/Signup';

ReactDOM.render(
  <React.StrictMode>

          <BrowserRouter>
            <App />
        </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);