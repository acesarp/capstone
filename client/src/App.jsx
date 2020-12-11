
import './main.css';
import React from 'react';
import Header from './components/Header';
import Login from './components/Login';
import UserDetails from './components/User/UserDetails';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends React.Component {

  state = {
    user: {}
  }

  dataHandler = (user_) => {
    console.log("dataHandler()) => ", user_)
    const cloneState = this.state;
    cloneState.user = user_;
    this.setState(cloneState);
  }

  render() {
    return (
      <div className="App">
        <Header user={this.state.user} />
      

        <BrowserRouter>
          <Switch>
              <Route exact path="/" >
              <Login dataHandler={ this.dataHandler } />
              </Route>
            <Route exact path="/login">
              <Login dataHandler={ this.dataHandler } />
            </Route>
            
            <Route path="/userDetails" render={(props) => <UserDetails {...props} /> } />
              
          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
