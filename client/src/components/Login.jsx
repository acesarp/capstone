
import axios from 'axios';
import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Signup from './Signup';

class Login extends React.Component {
  serverUrl = process.env.REACT_APP_SERVER_URL;
  
  state = {
    user: {},
      userAuthorized: false,
      loginVisible: true,
      pageTitle: "Login",
      loginFormData: {
        userName: "",
        password: ""
      }
    }


  loginHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const requestUrl = `${this.serverUrl}/users/authorize/${this.state.loginFormData.userName}/${this.state.loginFormData.password}`;
    //console.log("loginHandler()", requestUrl);
    axios.get(requestUrl)
      .then(response => {
        console.log("loginHandler() ===>", response.data.user);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.userId);
        this.props.dataHandler(response.data.user);
        const cloneState = this.state;
        cloneState.userAuthorized = true;
        cloneState.user = response.data.user;
        this.setState(cloneState);
      })
      .catch(error => {
        console.error(error);
        //==========> Redirect to login!!
      });
  }


/**
 * 
 * @param {Boolean} status 
 */
  loginIsVisile = (status) => {
    const cloneState = this.state;
    cloneState.loginVisible = status;
    cloneState.pageTitle = "Sign up";
    this.setState(cloneState);
  }

  changeHandler = (event) => {
    const cloneState = this.state;
    cloneState.loginFormData[event.target.name] = event.target.value;
    this.setState(cloneState);
    console.debug(event.target.name, event.target.value);
  }


  render() {
    let tagToRender;
    console.log(this.state.user)
    if (this.state.loginVisible) {

      tagToRender = (
        <Fragment>
          {this.state.userAuthorized && <Redirect to={{
            pathname: "/userDetails",
            state: {
              user: this.state.user
            }
            
          }}
          push />}
      <form
      className = "login__form">
            <label>Username:</label>
            <input
              type="text"
              name="userName"
              value={this.state.loginFormData.userName}
              onChange={this.changeHandler}
              required
              placeholder="User name" />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.loginFormData.password}
              onChange={this.changeHandler}
              required
              autoComplete="true"
              aria-current="true"
              placeholder="Password" />
            
            <button className="" type="button" onClick={ this.loginHandler } >
              Submit
          </button>
            
      </form >
          <button
            className="btn signup__btn"
            onClick={() => this.loginIsVisile(false)}>
         Sign up
        </button>
      </Fragment>);

    }
    else {

      tagToRender = (
        <Fragment>
          <Signup dataHandler={ this.props.dataHandler }/>
          <button onClick={() => this.loginIsVisile(true)}>Login</button>
        </Fragment>
          
      );
    }

    return (
      <div className="login__wrapper">
        <h1 className="title">{ this.state.pageTitle}</h1>

        {tagToRender}
      </div>
    );
  }
}

export default Login;
