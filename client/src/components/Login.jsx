import React, { Fragment } from 'react';
import Signup from './Signup';
import { Link } from 'react-router-dom';

class Login extends React.Component {

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
    	console.log(this.state.user)
    	if (this.state.loginVisible) {

    		tagToRender = (
        	<Fragment>
				<form
					onSubmit={ this.loginHandler }
					className = "login__form">
            		<label>Username:</label>
            		<input
						type="text"
						name="userName"
						value={this.state.loginFormData.userName}
						onChange={this.changeHandler}
						required
						placeholder="User name" />

            		<label>Password</label>
            		<input
						type="password"
						name="password"
						value={this.state.loginFormData.password}
						onChange={this.changeHandler}
						required
						autoComplete="true"
						aria-current="true"
						placeholder="Password" />

            		<button className="btn" type="submit"  >
            			Submit
        			</button>
            
				</form >
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

export default Login;
