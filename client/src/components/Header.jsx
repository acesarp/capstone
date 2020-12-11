
import axios from 'axios';
import React from 'react';
import dotenv from 'dotenv';
import logo from '../assets/images/logo.png';
import { Redirect } from 'react-router-dom';
import UserFriendsList from './User/UserFriendsList';
dotenv.config();
const serverUrl = process.env.REACT_APP_SERVER_URL;
class Header extends React.Component {


  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      
      search: "",
      user: props.user,
      isUserLoggedIn: true,
      buttonLabel: "Log out"
    }
  }

  logoutHandler(event) {

    axios.get(`${serverUrl}/users/logout/${this.state.user.userId}`)
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

  changeHandler = (event) => {
    let cloneState = this.state;
    let keyword = event.target.value;
    cloneState[event.target.name] = event.target.value;
    this.setState(cloneState);
    const queryUrl = `${process.env.REACT_APP_SERVER_URL}/users/friends/${localStorage.getItem("userId")}/${localStorage.getItem("token")}/${keyword}`;
    //console.info(queryUrl);
    axios.get(queryUrl)
    .then(response => {
      console.log(response.data);
      cloneState = this.state;
      cloneState.friends = response.data;
      this.setState(cloneState);
      console.debug(this.state.friends);
    })
    .catch (error => console.error(error));

  }

  render() {

    let tagToRender;

    if (this.state.isUserLoggedIn) {
      tagToRender = (<div>
        <img className="header__avatar" src={`${serverUrl}/pictures/${this.state.user.picture_med}/`} alt="" />
        <span>{this.state.user.displayname}</span>
        <form>
          <input
          name="search"
          className="header__btn"
            onChange={this.changeHandler}
            placeholder="Search..."
          value={ this.state.value } />
          </form>
        <button
          className="header__btn"
            onClick={this.logoutHandler}>
          {this.state.buttonLabel}
        </button>
        { this.state.friends && <UserFriendsList friends={this.state.friends} /> }
      </div>);
    }
    else {
      tagToRender = (
        <Redirect to="/" />
      );
    }

    return (
      <header className="header__wrapper">

        {/* <div className="header__inner-wrapper"> */}
        <div className="header__logo-wrapper">
          <img className="header__logo" src={logo} alt="logo" />
        </div>
        { tagToRender }
        
        {/* </div> */}
      </header>
    );
  }
}

export default Header;
