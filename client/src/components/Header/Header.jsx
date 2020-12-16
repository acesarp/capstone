

import React from 'react';
import logo from '../../assets/images/logo-transparent.png';
import { Redirect, Link } from 'react-router-dom';
//import UserFriendsList from '../User/UserFriendsList';

class Header extends React.Component {


		buttonLabel = "Log out";


	render() {
		console.log("Header ", this.props);
		return (
			<header className="header">
				{
					!this.props.loginStatus && <Redirect to="/login" />
				}
				<div className="header__inner-wrapper--col-container-1">
					<div className="header__logo-wrapper">
							<Link to={this.props.loginStatus ? "/userDetails" : "#" }> <img className="header__logo" src={logo} alt="logo" /> </Link>
						</div>
					{
						this.props.loginStatus &&
						<div className="header__inner-wrapper--col-1" onClick={ this.props.history && this.props.history.push('/userDetails')}>
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
				<div className="header__inner-wrapper--col-container-2">

					<div className="header__inner-wrapper--col-2" >
						{
							this.props.loginStatus &&
							<>
						<form className="header__search--form">
							<input
								name="search"
								className="header__search--input"
								onChange={this.props.searchHandler}
								placeholder="Search people..."
								value={this.props.value} />
						</form>

							<button
								className="header__btn"
								onClick={this.props.logoutHandler}>
								{this.buttonLabel}
								</button>
								</>
						}
					</div>
				</div>
        
			</header>
		);
	}
}

export default Header;
