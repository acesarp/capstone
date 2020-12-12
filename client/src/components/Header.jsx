
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
    	console.log(props);

		this.state = {
			search: "",
			buttonLabel: "Log out"
		}
	}



  render() {

    let tagToRender;

    if (this.props.loginStatus) {
		tagToRender = (<div>
			<img
				className="header__avatar"
				src={`${serverUrl}/pictures/${this.props.user.picture_med}/`}
				alt="" />
        	<span>{this.props.user.displayname}</span>
        <form>
          <input
			name="search"
			className="header__btn"
            onChange={this.props.searchHandler}
            placeholder="Search..."
			value={ this.state.value } />
        </form>
        <button
			className="header__btn"
            onClick={this.props.logoutHandler}>
          {this.state.buttonLabel}
        </button>
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
