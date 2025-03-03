
import React from 'react';
import { getUserData, postUser } from '../../authorizationScripts';
import ClientModel from '../../Models/ClientModel';
import { Redirect, withRouter } from 'react-router-dom';

class UserAddEdit extends React.Component {


    constructor(props) {
        super(props);
        console.info(props.user);
            // New user - mock data for testing
            this.state = {

                formData: {
                    username: "mickey555",
                    password: "p@$$w0rd",
                    firstName: "Mickey",
                    lastName: "Mouse",
                    dob: "1967-08-10",
                    email: "mickey-mouse@email.ca",
                    phone: "555-123-4321",
                    gender: "male",
                    about: "Me me me me me me",
                    avatar: "",
                    avatarImgSrc: "",
                    street: "Fake st",
                    city: "Orlando",
                    province_state: "FL",
                    country: "USA"
                }
            };
        }
    

    async componentDidMount() {
        let clone;
        console.info(this.props.user);
        if (this.props.user) {
            const dob = this.props.user.dob.split('-');

            console.info(this.props.user);
            const dobAsString = `${dob[0]}-${dob[1]}-${dob[2].substring(0,2)}`;
            clone = { // Edit existing user
                formData: {

                    username: this.props.user.username,
                    firstName: this.props.user.firstName,
                    lastName: this.props.user.lastName,
                    password: this.props.user.password,
                    dob: dobAsString,
                    email: this.props.user.email,
                    phone: this.props.user.phone,
                    gender: this.props.user.gender,
                    //avatar: props.user.avatar,
                    about: this.props.user.about,
                    street: this.props.user.street,
                    city: this.props.user.city,
                    province_state: this.props.user.province_state,
                    country: this.props.user.country
                }
            };
            this.setState(clone);
        }
        
        console.log("user: ", this.props.user);
        // If there's no userId a new user will be created (Signup)
        // no need to populate the form
        if (this.props.user) {
            getUserData(this.props.userId, localStorage.getItem("token"));
        }
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
            const model = new ClientModel(
                sessionStorage.getItem("userId"),
                data.get("username").toString(),
                data.get("password").toString(),
                data.get("firstName").toString(),
                data.get("lastName").toString(),
                data.get("dob"),
                data.get("about").toString(),
                data.get("email").toString(),
                data.get("phone").toString(),
                data.get("gender").toString(),
                data.get("avatar").name,
                imageBase64,
                {
                    street: data.get("street").toString(),
                    city: data.get("city").toString(),
                    province_state: data.get("province_state").toString(),
                    country: data.get("country").toString()
                }
            );

            console.log(model.toJSON());
            const result = await postUser(model);
            
            //const cloneState = this.state;
            //console.log(result.data.user);
            if (result.data.error && result.data.error.meta.target === "username_unique") {
                alert(model.userName + " User name already exists!");
            }
            else if (result.data.error && result.data.error.meta.target === "email_unique") {
                alert(model.email + " Email already exists!");
            }
            else {
                //cloneState.user = result.data.user;
                //cloneState.isLoggedIn = true;
                event.target.reset();
                this.props.setUserParent(result.data.user);
                alert("Personal data updated!");
                this.props.history.push('/userDetails');
                //this.setState(cloneState);

            }
            
        }
        catch (error) {
            console.error("formSubmitHandler() => ", error);
        }

    }

    changeHandler = (event) => {
        const cloneState = this.state;
        console.log(event.target.name, event.target.value);
        cloneState.formData[event.target.name] = event.target.value;
        if (event.target.name === "avatar") {
            //var image = document.getElementById('avatar-image-id');
            cloneState.formData.avatarImgSrc = URL.createObjectURL(event.target.files[0]);
            console.log(cloneState.formData.avatarImgSrc);
        }
        this.setState(cloneState);
    };



    render() {
        //console.log(this.state)
        return (

            <div className="form__wrapper">
                {this.state.isLoggedIn && <Redirect to={{
                    pathname: "/userDetails"
                }}
                push /> }
                <button className="event-form__btn" onClick={this.props.history.goBack}>Back</button>
                <h1 className="white-text">{this.props.user ? "Edit" : "Create" } profile</h1>
                <form
                    className="from-user"
                    onSubmit={this.formSubmitHandler}>

                    <div className="form__group">

                        <label className="form__label"> User name </label>
                        <input
                            className="form__input"
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={this.state.formData.username}
                            onChange={this.changeHandler} />

                    </div>
                    <div className="form__group">
                        <label className="form__label"> Password</label>
                        <input
                            className="form__input"
                            type="text"
                            name="password"
                            placeholder="Enter password"
                            value={this.state.formData.password}
                            onChange={this.changeHandler} />
                    </div>
                    <div className="form__group">
                        <label className="form__label"> First name </label>
                        <input
                            className="form__input"
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            value={this.state.formData.firstName}
                            onChange={this.changeHandler} />
                    </div>
                    <div className="form__group">
                        <label className="form__label">  Last Name</label>

                        <input
                            className="form__input"
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            value={this.state.formData.lastName}
                            onChange={this.changeHandler} />
                    </div>

                    <div className="form__group">
                        <label className="form__label"> Date of Birth</label>
                        <input
                            className="form__input"
                            type="date"
                            name="dob"
                            value={this.state.formData.dob}
                            onChange={this.changeHandler} />
                    </div>

                    <div className="form__group">
                        <label className="form__label"> Email </label>
                        <input
                            className="form__input"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={this.state.formData.email}
                            onChange={this.changeHandler} />
                    </div>

                    <div className="form__group">
                        <label className="form__label"> Phone number</label>
                        <input
                            className="form__input"
                            type="phone"
                            name="phone"
                            value={this.state.formData.phone}
                            onChange={this.changeHandler} />

                    </div>
                    <div className="form__group">
                        <label className="form__label"> Gender </label>

                        <input
                            className="form__input"
                            type="text"
                            name="gender"
                            value={this.state.formData.gender}
                            onChange={this.changeHandler} />

                    </div>
                    <div className="form__group">
                        <label className="form__label"> About </label>

                        <textarea
                            aria-multiline="true"
                            maxLength="600"
                            className="form__input"
                            type="text"
                            name="about"
                            value={this.state.formData.about}
                            onChange={this.changeHandler} />

                    </div>
                    <div className="form__group">
                        <label className="form__label"> Avatar </label>
                        <div>

                            {this.props.user && <img src={this.props.user.avatar} alt="avatar to upload" />}
                            {!this.props.user && <img id="avatar-image-id" src={ this.state.formData.avatarImgSrc} alt="avatar to upload" />}

                        </div>
                        <input className="form__input"
                            type="file"
                            accept="image/jpg, image/png, image/jpeg, image/gif, image/x-png"
                            name="avatar"
                            value={this.state.formData.avatar}
                            onChange={this.changeHandler} />

                    </div>
                    <div className="form__group">

                        <div className="form__group--large">
                            <div className="form__label--large"> Address </div>
                            <div>
                            <div className="form__label">Street</div>
                            <input className="form__input"
                                type="text"
                                name="street"
                                value={this.state.formData.street}
                                    onChange={this.changeHandler} />
                            </div>
                            <div>
                            <div className="form__label">City</div>
                            <input className="form__input"
                                type="text"
                                name="city"
                                placeholder="Enter City"
                                value={this.state.formData.city}
                                onChange={this.changeHandler} />
                            </div>
                            <div>
                            <div className="form__label">Province or State</div>
                            <input className="form__input"
                                type="text"
                                    name="province_state"
                                    placeholder="Enter Province/State"
                                value={this.state.formData.province_state}
                                    onChange={this.changeHandler} />
                            </div>
                            <div>
                            <div className="form__label">Country</div>
                            <input className="form__input"
                                type="text"
                                name="country"
                                    value={this.state.formData.country}
                                    placeholder="Enter Country"
                                    onChange={this.changeHandler} />
                                </div>
                        </div>
                    </div>
                    <div className="button-group">
                    <button
                        className="button"
                        type="submit"
                        value="submit" >
                        Save
                    </button>
                        </div>
                </form>

            </div>
        );
    }
}

export default withRouter(UserAddEdit);
