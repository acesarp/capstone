
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserAddEdit from './User/UserAddEdit';

class Signup extends React.Component {
  serverUrl = process.env.REACT_APP_SERVER_URL;
  
    state = {
      loginVisible: true,
      pageTitle: "Signup",
      loginFormData: {
        userName: "",
        password: ""
      }
    }

  formVisible = false;


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

    changeHandler = (event) => {
    const cloneState = this.state;
    cloneState.loginFormData[event.target.name] = event.target.value;
    this.setState(cloneState);
    console.debug(event.target.name, event.target.value);
  }


  render() {
    return (
      <div className="sign-up-wrapper">
        <UserAddEdit dataHandler={ this.props.dataHandler }/>
      </div>
    );
  }
}

export default Signup;