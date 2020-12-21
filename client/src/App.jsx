
import React from 'react';
import Header from './components/Header/Header';
import Login from './components/Login';
import UserDetails from './components/User/UserDetails';
import { authorizeUser, logout } from './authorizationScripts';
import { Route, Switch, withRouter } from 'react-router-dom';
import UserAddEdit from './components/User/UserAddEdit';
import UserFriendsList from './components/User/UserFriendsList';
import AddEditEvent from './components/Event/AddEditEvent';
import axios from 'axios';
import dotenv from 'dotenv';
import ModalSearch from './components/Header/ModalSearch';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventList from './components/Event/EventList';
import Gallery from './components/User/Gallery';
dotenv.config();
class App extends React.Component {

	state = {
		isLoggedIn: false,
		userId: -1,
		user: {},
		searchMode: false,
		friends: [],
		pictures: []
	};

	componentDidMount() {
				// let tag;
		if (this.state.isLoggedIn) {
			this.props.history.push("/UserDetails");

		}
		else {
			this.props.history.push("/login");
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
		const result = await authorizeUser(event.userName, event.password);
		
		if (result.response && result.response.data.message) {
			alert(result.response.data.message);
			return; //(<Redirect to="/login" />);
		}
		if (result.data) {
			const user = result.data.user;
			const cloneState = this.state;
			cloneState.isLoggedIn = sessionStorage.getItem("isloggedIn");
			cloneState.userId = user.userId;
			cloneState.user = user;
			this.setState(cloneState, this.props.history.push("/userDetails"));
		}
		else {
			alert("Server is offline.");
		}
	}

	addFriendHandler = (friendId_) => {
		
		const queryUrl = `${process.env.REACT_APP_SERVER_URL}/users/friends/friend/add/${sessionStorage.getItem("userId")}/${sessionStorage.getItem("token")}/${friendId_}`;
		axios.get(queryUrl)
		.then(response => {
			console.log(response.data);
			alert("Friend added!");
		})
		.catch(error => {
		console.error(error);
		});
	}

	setUserParent = (user_) => {
		let cloneState = this.state;
		cloneState.userId = user_.userId;
		cloneState.isLoggedIn = true;
		cloneState.user = user_;
		this.setState(cloneState);
	}

	logoutHandler = async () => {
		const data = await logout();
		console.info("Logout status: ", data);
		const cloneState = {
			isLoggedIn: false,
			userId: -1,
			user: {},
			searchMode: false,
			friends: []
		};
		cloneState.isLoggedIn = false;
		this.setState(cloneState);
	}

	/**
	 *  Search event handler
	 * @param {Event} event 
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
				console.log("response data: ", response.data);
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

	friendDetailsHandler = (userId_) => {
		console.log(userId_);
		const queryUrl = `${process.env.REACT_APP_SERVER_URL}/users/friends/friend/${sessionStorage.getItem("userId")}/${sessionStorage.getItem("token")}/${userId_}`;
			
			axios.get(queryUrl)
				.then(response => {
					console.log("friendDetailsHandler ", response.data);
					const cloneState = this.state;
					cloneState.friendClicked = response.data;
					cloneState.searchMode = false;
					this.setState(cloneState, this.props.history.push("/friendDetails"));
			})
			.catch(error => {
				console.error(error);
			});
	}
	
	submitEventHandler = (formData) => {
		let method_ = this.state.eventId ? "put" : "post";
		console.dir(formData, method_);
		axios({
			url:`${process.env.REACT_APP_SERVER_URL}/events`, 
			method: method_,
			headers: {
				token: sessionStorage.getItem("token")
            },
			data: {
				ownerId: this.state.userId,
                name: formData.name,
                description: formData.description,
                date: formData.date,
                location: formData.location,
                participants: formData.participants
            }
        })
        .then(response => {
            console.error(response);
        })
        .catch(error => console.error(error));

    }


	render() {

		return (

		<div className="app">
				<Header
					history={ this.props.history}
					loginStatus={this.state.isLoggedIn}
					user={this.state.isLoggedIn && this.state.user}
					searchHandler={this.searchHandler}
					logoutHandler={this.logoutHandler}
				/>
				
				{ this.state.searchMode && <ModalSearch friends={this.state.friends} friendDetailsHandler={ this.friendDetailsHandler }/> }
			<Switch>
				{/* <Route exact path="/" /> */}
				<Route exact path="/login">
					<Login loginHandler={ this.loginHandler }/>
				</Route>            
					<Route path="/signup" render={(props) => <UserAddEdit {...props} setUserParent={this.setUserParent} />} />
				
					<Route path="/userAddEdit" render={(props) => <UserAddEdit {...props} user={this.state.user} setUserParent={this.setUserParent} />} />

					<Route path="/addEditEvent" render={(props) => <AddEditEvent {...props} user={this.state.user} submitEventHandler={ this.submitEventHandler }/>} />
					
					<Route path="/userDetails" render={(props) => <UserDetails {...props} isOwner={true} user={this.state.user} />} />
					
					<Route path="/userFriendsList" render={(props) => <UserFriendsList {...props} friends={this.state.user.friends} />} />
					
					<Route path="/friendDetails" render={(props) => <UserDetails {...props} isOwner={false} user={this.state.friendClicked} addFriendHandler={this.addFriendHandler} />} /> 
					<Route path="/eventlist" render={(props) => <EventList {...props} isOwner={true} user={this.state.user} clickEvent={this.addFriendHandler} />} />
					<Route path="/gallery" render={(props) => <Gallery {...props} isOwner={true} user={this.state.user} pictures={this.state.pictures} />} />
			</Switch>

			</div>
			
		);
	}

}

export default withRouter(App);