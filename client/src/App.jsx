
import './main.css';
import React from 'react';
import Header from './components/Header';
import Login from './components/Login';
import ProfileDetails from './components/Profile/ProfileDetails';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

class App extends React.Component {
  baseUrl = "localhost"



  componentDidMount() {
    axios.get(`${this.baseUrl}/`)
      .then(response => {
        
      })
      .catch(error => console.error(error));

  }

  

  render() {
    return (
      <div className="App">
        <Header />

        <BrowserRouter>
          <Switch>
              <Route exact path="/" >
                <Login />
              </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            
            <Route path="/profileDetails">
              <ProfileDetails />
            </Route>            
              
          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
