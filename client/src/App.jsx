
import './main.css';
import React from 'react';
import Header from './components/Header/Header';
import Login from './components/Login';
import UserDetails from './components/User/UserDetails';
import { authorizeUser, logout } from './authorizationScripts';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import UserAddEdit from './components/User/UserAddEdit';
//import UserFriendsList from './components/User/UserDetails';
import Signup from './components/Signup';
import axios from 'axios';
import dotenv from 'dotenv';
import ModalSearch from './components/Header/ModalSearch';
dotenv.config();
class App extends React.Component {

	state = {
		isLoggedIn: false,
		userId: -1,
		user: {},
		searchMode: false,
		friends: []
	};

	componentDidMount() {
				// let tag;
		if (this.state.isLoggedIn) {

		this.props.history.push("/UserDetails");

		//<UserDetails user={this.state.user} friends={this.state.friends} />;
		}
		else {
			this.props.history.push("/login");
		///	tag = <Login loginHandler={ this.loginHandler }  />;
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.isLoggedIn !== this.state.isLoggedIn) {
			if (this.state.isLoggedIn) {

				this.props.history.push("/UserDetails");
			}
			else {
				this.props.history.push("/login");
			}
		}
	}

	loginHandler = async (event) => {
		const user = await authorizeUser(event.userName, event.password);
		//console.table(user);
		if (!user) { 
			return (<Redirect to="/login" />);
			//========> redirect TODO;
		}
		const cloneState = this.state;
		cloneState.isLoggedIn = sessionStorage.getItem("isloggedIn");
		cloneState.user = user;
		this.setState(cloneState);
		this.props.history.push("/userDetails");
	}

	logoutHandler = () => {
		const data = logout();
		console.info(data);
		const cloneState = this.state;
		cloneState.isLoggedIn = false;
		this.setState(cloneState);
	}

	/**
	 *  Search event handler
	 * @param {*} event 
	 */
	searchHandler = (event) => {
		let cloneState = this.state;
		let keyword = event.target.value;
		cloneState[event.target.name] = keyword;
		console.log(keyword, this.state.friends, this.state.searchMode);
		
		if (keyword !== "") {
			const queryUrl = `${process.env.REACT_APP_SERVER_URL}/users/friends/${sessionStorage.getItem("userId")}/${sessionStorage.getItem("token")}/${keyword}`;
			//console.info(queryUrl);
			
			axios.get(queryUrl)
			.then(response => {
				cloneState.friends = response.data;
				
				cloneState.searchMode = response.data === [] ? false : true;
				console.log("response data ---- " + response.data);
				//console.dir(response);
				this.setState(cloneState);

			})
			.catch(error => {
			console.error(error);
				cloneState.searchMode = false;
				cloneState.friends = [];
				this.setState(cloneState);
			});
		}
		else {
			cloneState.searchMode = false;
			cloneState.friends = [];
			this.setState(cloneState);
		}

		


	}

	render() {

		return (

		<div className="app">
				<Header
					loginStatus={this.state.isLoggedIn}
					user={this.state.isLoggedIn && this.state.user}
					searchHandler={this.searchHandler}
					logoutHandler={this.logoutHandler}
				/>

				{ this.state.searchMode && <ModalSearch friends={this.state.friends} /> }


			<Switch>
				{/* <Route exact path="/" /> */}

				<Route exact path="/login">
						<Login loginHandler={ this.loginHandler }/>
				</Route>
            
				<Route path="/userAddEdit" render={(props) => <UserAddEdit {...props} user={this.state.user} />} />			
				<Route path="/userDetails" render={(props) => <UserDetails {...props} user={this.state.user} friends={[]} />} />
						{/* {tag}
						{ this.state.friends && <UserFriendsList friends={this.state.friends} />} */}

				<Route path="/signup" render={ (props) => <Signup {...props} /> } />  
			</Switch>
			</div>
			
		);
	}

}

export default withRouter(App);