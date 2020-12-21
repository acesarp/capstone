import React, { Fragment } from 'react';
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
		//console.log(this.state.user)

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
						<a href="/" alt="">Forgot password?</a>
            		<button className="button" type="submit"  >
            			Login
        			</button>
            
					</form >
		<button className="button">
        	<Link
    			to='/signup'>
				Sign up
        	</Link>
		</button>
		</Fragment>);

    }
    else {

    	tagToRender = (
        	<Fragment>
			<button className="button">
        	<Link
            	className=""
    			to='/signup'>	
				Sign up
        	</Link>
		</button>
				<button className="button" onClick={() => this.loginIsVisile(true)}>Login</button>
        	</Fragment>
    	);
    }

    return (
		<div className="login__wrapper">
			<h1 className="font--light title">{ this.state.pageTitle}</h1>
			{tagToRender}
		</div>
    );
	}
}

export default Login;
