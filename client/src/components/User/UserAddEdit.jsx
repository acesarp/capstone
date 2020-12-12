
import React from 'react';
import { getUserData, postUser } from '../../authorizationScripts';

import ClientUserModel from '../../Models/ClientModel';
import { Redirect } from 'react-router-dom';

class UserAddEdit extends React.Component {


    constructor(props) {
        super(props);
        console.info("UserAddEdit props: ", this.props);

		this.state.formData = {
			userName: "Allen42",
			password: "p@$$w0rd",
			firstName: "Guelph",
			lastName: "Allemm",
			dob: "1957-02-10",
			email: "all57@email.ca",
			phone: "555-555-5555",
			gender: "male",
			about: "Me me me",
			avatar: "",
			street: "Fake st",
			city: "Seattle",
			provincestate: "AL",
			country: "France"
		}
    }

    async componentDidMount() {
        console.log("User: ", this.props.userId);
        // If there's no userId a new user will be created (Signup)
        // no need to populate the form
        if (!this.props.userId) return; 

        getUserData(this.props.userId, sessionStorage.getTtem("token"))
        let cloneState = this.state;
        cloneState.formData = {
            userName: this.props.user.userName,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            password: this.props.user.password,
            dob: this.props.user.dob,
            email: this.props.user.email,
            phone: this.props.user.phone,
            gender: this.props.user.gender,
            avatar: this.props.user.avatar,
            about: this.props.user.about,
            street: this.props.user.street,
            city: this.props.user.city,
            provincestate: this.props.user.provincestate,
            country: this.props.user.country
        };
        this.setState(cloneState);
        //console.log(cloneState.formData);

    }
    /**
     * 
     * @param {React.FormEvent<HTMLFormElement>} event 
     */
    formSubmitHandler = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            let data = new FormData(event.target);

            let imageBase64 = await new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.readAsDataURL(data.get("avatar"));

                reader.onload = (() => {
                    //console.log(resolve_.loaded);
                    resolve(reader.result);
                });
            });

            //console.table(imageBase64);
            const model = new ClientUserModel(
                this.state.userId,
                data.get("userName").toString(),
                data.get("password").toString(),
                data.get("firstName").toString(),
                data.get("lastName").toString(),
                new Date(data.get("dob").toString()),
                data.get("about").toString(),
                data.get("email").toString(),
                data.get("phone").toString(),
                data.get("gender").toString(),
                data.get("avatar").name,
                imageBase64,
                {
                    street: data.get("street").toString(),
                    city: data.get("city").toString(),
                    provincestate: data.get("provincestate").toString(),
                    country: data.get("country").toString()
                }
            );

            //console.log(model.toJSON());

            const result = postUser(model);
            const cloneState = this.state;
            cloneState.user = result.user;
            cloneState.isLoggedIn = true;
            this.setState(cloneState);
            event.target.reset();
            
        }
        catch (error) {
            console.error("formSubmitHandler() => ", error);
        }

    }

    changeHandler = (event) => {
        const cloneState = this.state;
        console.log(event.target.name, event.target.value);
        cloneState.formData[event.target.name] = event.target.value;
        this.setState(cloneState);
    };

    render() {
        //console.log(this.state)
        return (

            <div className="form-user__wrapper">
                {this.state.isLoggedIn && <Redirect to={{
                    pathname: "/userDetails",
                    state: {
                        obj: "obj",
                    user: this.state.user
                    }
                }}
                push /> }
                    
                <h1>{this.props.pagetitle}</h1>

                <form
                    className="from-user"
                    onSubmit={this.formSubmitHandler}>

                    <div className="form-group">

                        <label className="form__label"> User name </label>
                        <input
                            className="form__input"
                            type="text"
                            name="userName"
                            value={this.state.formData.userName}
                            onChange={this.changeHandler} />

                    </div>
                    <div className="form-group">
                        <label className="form__label"> Password</label>
                        <input
                            className="form__input"
                            type="text"
                            name="password"
                            value={this.state.formData.password}
                            onChange={this.changeHandler} />
                    </div>
                    <div className="form-group">
                        <label className="form__label"> First name </label>
                        <input
                            className="form__input"
                            type="text"
                            name="firstName"
                            value={this.state.formData.firstName}
                            onChange={this.changeHandler} />
                    </div>
                    <div className="form-group">
                        <label className="form__label">  Last Name</label>

                        <input
                            className="form__input"
                            type="text"
                            name="lastName"
                            value={this.state.formData.lastName}
                            onChange={this.changeHandler} />
                    </div>

                    <div className="form-group">
                        <label className="form__label"> Date of Birth</label>
                        <input
                            className="form__input"
                            type="date"
                            name="dob"
                            value={this.state.formData.dob}
                            onChange={this.changeHandler} />
                    </div>

                    <div className="form-group">
                        <label className="form__label"> Email </label>
                        <input
                            className="form__input"
                            type="email"
                            name="email"
                            value={this.state.formData.email}
                            onChange={this.changeHandler} />
                    </div>

                    <div className="form-group">
                        <label className="form__label"> Phone number</label>
                        <input
                            className="form__input"
                            type="phone"
                            name="phone"
                            value={this.state.formData.phone}
                            onChange={this.changeHandler} />

                    </div>
                    <div className="form-group">
                        <label className="form__label"> Gender </label>

                        <input
                            className="form__input"
                            type="text"
                            name="gender"
                            value={this.state.formData.gender}
                            onChange={this.changeHandler} />

                    </div>
                    <div className="form-group">
                        <label className="form__label"> About </label>

                        <input
                            className="form__input"
                            type="text"
                            name="about"
                            value={this.state.formData.about}
                            onChange={this.changeHandler} />

                    </div>
                    <div className="form-group">
                        <label className="form__label"> Avatar </label>

                        <input className="form__input"
                            type="file"
                            accept="image/jpg, image/png, image/jpeg, image/gif, image/x-png"
                            name="avatar"
                            value={this.state.formData.avatar}
                            onChange={this.changeHandler} />

                    </div>
                    <div className="form-group">

                        <label className="form__label"> Address </label>
                        <input className="form__input"
                            type="text"
                            name="street"
                            value={this.state.formData.street}
                            onChange={this.changeHandler} />

                        <input className="form__input"
                            type="text"
                            name="city"
                            value={this.state.formData.city}
                            onChange={this.changeHandler} />

                        <input className="form__input"
                            type="text"
                            name="provincestate"
                            value={this.state.formData.provincestate}
                            onChange={this.changeHandler} />

                        <input className="form__input"
                            type="text"
                            name="country"
                            value={this.state.formData.country}
                            onChange={this.changeHandler} />
                    </div>

                    <button
                        className="btn"
                        type="submit"
                        value="submit" >Save</button>

                </form>

            </div>
        );
    }
}

export default UserAddEdit;
