
import axios from 'axios';
import React from 'react';
import dotenv from 'dotenv';
import logo from '../assets/images/logo.png';
dotenv.config();
const serverUrl = process.env.REACT_APP_SERVER_URL;
class Header extends React.Component {


  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      userId: props.user.userId,
      displayName: props.user.displayName,
      isUserLoggedIn: true,
      buttonLabel: "Log out"
    }
  }

  logoutHandler(event) {
    
    axios.get(`${serverUrl}/users/logout/${this.state.userId}`)
      .then(response => {
        if(response.status === 200){
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          
          const cloneState = this.state;
          cloneState.isUserLoggedIn = false;
          this.setState(cloneState);
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <header className="header__wrapper">

        <div className="header__inner-wrapper">

          <img src={logo} alt="logo" />

          {this.state.isUserLoggedIn &&
            <div>
              <span>{ this.state.displayname}</span>
            <img
              src={`${serverUrl}/pictures/${this.state.avatar}/${this.state.userId}/`}
              alt="" />
            
            <button
              className="header__btn"
              onClick={this.logoutHandler}>
              {this.state.buttonLabel}
            </button>
            </div>
          }
        
</div>
      </header>
    );
  }
}



export default Header;
