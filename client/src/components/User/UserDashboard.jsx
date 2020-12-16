import React, { Fragment } from 'react';
import Signup from './Signup';
import { Link } from 'react-router-dom';

class UserDashboard extends React.Component {

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
		this.props.loginHandler(this.state.loginFormData);
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
		//console.log(this.state.user)

		if (this.state.loginVisible) {

			tagToRender = (
				<Fragment>
					<div>
						<button className="btn">  Profile</button>
						<button className="btn">  Friends</button>
						<button className="btn">  Events</button>
        				<button className="btn">  Submit</button>
            
				</div >
        <Link
            className="btn signup__btn"
            to='/signup'>
        	Sign up
        </Link>
		</Fragment>);

    }
    else {

    	tagToRender = (
        	<Fragment>
				<Signup Handler={ this.props.authHandler }/>
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

export default UserDashboard;
