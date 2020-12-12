
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserAddEdit from './User/UserAddEdit';

class Signup extends React.Component {

  

  signupHandler(event) {
    event.perventDefault();
    axios.post(`${this.serverUrl}/signup`, {
        loginFormData: this.state.loginFormData
    })
    .then(response => console.log(response.data));
    
    if (this.state.userAuthorized) {
      <Link
        to={{
          pathname: './userDetails',
          state: {
            token: "",
            userId: ""
          }
        }} />
    }

  }

  render() {
    return (
      <div className="sign-up-wrapper">
        <h1> Sign up </h1>
        <UserAddEdit dataHandler={ this.props.authHandler }/>
      </div>
    );
  }
}

export default Signup;