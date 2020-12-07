
import React from 'react';
import { Link } from 'react-router-dom';
class Login extends React.Component {


  loginHandler() {



    if (this.state.userAuthorized) {
      <Link
        to={{
          pathname: './profile',
          state: {
            token: "",
            profileId: ""
          }
        }} />
    }

  }

  onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}


  render() {
    return (
      <div className="App">

  {/* <a href={googleLoginUrl}>
    Login with Google
  </a> */}



        <form
          className="login-form"
          onSubmit={this.loginHandler}>
          <input
            type="text"
            name="userName"
            value="testUser"
            placeholder="User name" />
          <input type="password"
            value="password"
            placeholder="Password" />
          <input type="submit" />
        </form>

        <div className="g-signin2" data-onsuccess="onSignIn"></div>

        <div className='g-sign-in-button'>
          <div className='content-wrapper'>
            <div className='logo-wrapper'>
              <img src='https://developers.google.com/identity/images/g-logo.png' alt="" />
            </div>
              <div className='text-container'>
                <span>Sign in with Google</span>
              </div>
          </div>
        </div>
          
      </div>
    );
  }
}

export default Login;
