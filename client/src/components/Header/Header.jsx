

import React from 'react';
import logo from '../../assets/images/logo-transparent.png';
import { Redirect } from 'react-router-dom';
//import UserFriendsList from '../User/UserFriendsList';
//const serverUrl = process.env.REACT_APP_SERVER_URL;

class Header extends React.Component {


	constructor(props) {
		super(props);
		console.log(props);

		this.buttonLabel = "Log out";
	}

	render() {

		return (
			<header className="header">
				{
					!this.props.loginStatus && <Redirect to="/" />
				}
				<div className="header__inner-wrapper--col-1">
						<div className="header__logo-wrapper">
							<img className="header__logo" src={logo} alt="logo" />
						</div>
					{
						this.props.loginStatus &&
						<div className="header__inner-wrapper--col-2">
							<p className="header__text" >{this.props.user.displayName}</p>
							<div className="header__avatar--wrapper">
							<img
								className="header__avatar"
								src={`${this.props.user.picture_med}`}
								alt="user profile" />
								</div>
						</div>
					}
				</div>
				<div className="header__inner-wrapper--col-outer">

					<div className="header__inner-wrapper--col-4" >
						<form className="header__search--form">
							<input
								name="search"
								className="header__search--input"
								onChange={this.props.searchHandler}
								placeholder="Search..."
								value={this.props.value} />
						</form>
						<button
							className="header__btn"
							onClick={this.props.logoutHandler}>
							{this.buttonLabel}
						</button>
					</div>
				</div>
        
			</header>
		);
	}
}

export default Header;
