
import './main.css';
import React from 'react';
import Header from './components/Header';
import Login from './components/Login';
import UserDetails from './components/User/UserDetails';
import { authorizeUser, logout } from './authorizationScripts';
import { BrowserRouter , Route, Switch, withRouter } from 'react-router-dom';
import UserAddEdit from './components/User/UserAddEdit';
import UserFriendsList from './components/User/UserDetails';
import Signup from './components/Signup';
import axios from 'axios';
class App extends React.Component {

	state = {
		isLoggedIn: false,
		userId: -1,
		user: {},
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
			//========> redirect TODO;
		}
		const cloneState = this.state;
		cloneState.isLoggedIn = sessionStorage.getItem("isloggedIn");
		cloneState.user = user;
		this.setState(cloneState);
						this.props.history.push("/userDetails");
	}

	searchHandler = (event) => {
		const cloneState = this.state;
		cloneState.friends = event.target.friends;
		this.setState(cloneState);
	}

	logoutHandler = () => {
		const data = logout();
		console.info(data);
		const cloneState = this.state;
		cloneState.isLoggedIn = false;
		this.setState(cloneState);
	}

	searchHandler = (event) => {
		let cloneState = this.state;
		let keyword = event.target.value;
		cloneState[event.target.name] = event.target.value;
		
		const queryUrl = `${process.env.REACT_APP_SERVER_URL}/users/friends/${sessionStorage.getItem("userId")}/${sessionStorage.getItem("token")}/${keyword}`;
		//console.info(queryUrl);
		axios.get(queryUrl)
		.then(response => {
			console.log(response.data);
			
			cloneState = this.state;
			cloneState.friends = response.data;

			console.table(cloneState);
			
			this.setState(cloneState);

		})
		.catch (error => console.error(error));

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


			<Switch>
				{/* <Route exact path="/" /> */}

				<Route exact path="/login">
						<Login loginHandler={ this.loginHandler }/>
				</Route>
            
				<Route path="/userAddEdit" render={(props) => <UserAddEdit {...props} />} />			
				<Route path="/userDetails" render={(props) => <UserDetails {...props} user={this.state.user} friends={this.state.friends} />} />
						{/* {tag}
						{ this.state.friends && <UserFriendsList friends={this.state.friends} />} */}

				<Route path="/signup" render={ (props) => <Signup {...props} /> } />  
			</Switch>
			</div>
			
		);
	}

}

export default withRouter(App);