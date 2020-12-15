
import React from 'react';
import { getUserData, postUser } from '../../authorizationScripts';
import ClientModel from '../../Models/ClientModel';
import { Redirect, withRouter } from 'react-router-dom';
import BackIcon from '../../assets/images/icons/color-icons/png/back-icon.png';

class UserAddEdit extends React.Component {


    constructor(props) {
        super(props);
        let dob_ =new Date(this.props.user.dob).toString().substr(0, 10)
        console.info(props);

        this.state = { // mock data
            formData: {
                username: this.props.user.username,
                firstName: this.props.user.firstName,
                lastName: this.props.user.lastName,
                password: this.props.user.password,
                dob: dob_,
                email: this.props.user.email,
                phone: this.props.user.phone,
                gender: this.props.user.gender,
                //avatar: this.props.user.avatar,
                about: this.props.user.about,
                street: this.props.user.street,
                city: this.props.user.city,
                province_state: this.props.user.province_state,
                country: this.props.user.country
                //username: "Allen42",
                // password: "p@$$w0rd",
                // firstName: "Guelph",
                // lastName: "Allemm",
                // dob: "1957-02-10",
                // email: "all57@email.ca",
                // phone: "555-555-5555",
                // gender: "male",
                // about: "Me me me",
                // avatar: "",
                // street: "Fake st",
                // city: "Seattle",
                // province_state: "AL",
                // country: "France"
            }
		}
    }

    async componentDidMount() {
        console.log("user: ", this.props.user);
        // If there's no userId a new user will be created (Signup)
        // no need to populate the form
        if (!this.props.user.userId) return; 

        getUserData(this.props.userId, sessionStorage.getItem("token"));
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
                this.state.userId,
                data.get("username").toString(),
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
                    province_state: data.get("province_state").toString(),
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

            <div className="form__wrapper">
                {this.state.isLoggedIn && <Redirect to={{
                    pathname: "/userDetails",
                    state: {
                        obj: "obj",
                    user: this.state.user
                    }
                }}
                push /> }
                        <div
                            className="user-details__edit-btn"
                            // onClick={this.props.history && this.props.history.goBack()}
                        >
                            <img className="icon user-details__edit--icon" src={BackIcon} alt="" />
                        </div>
                <h1>Edit profile</h1>
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
                            <img src={ this.props.user.avatar } alt="avatar to upload"/>
                        </div>
                        <input className="form__input"
                            type="file"
                            accept="image/jpg, image/png, image/jpeg, image/gif, image/x-png"
                            name="avatar"
                            value={this.state.formData.avatar}
                            onChange={this.changeHandler} />

                    </div>
                    <div className="form__group">

                        <label className="form__label"> Address 
                            
                            <label className="form__label">street</label>
                        <input className="form__input"
                            type="text"
                            name="street"
                            value={this.state.formData.street}
                                onChange={this.changeHandler} />
                            
                        <label className="form__label">City</label>
                        <input className="form__input"
                            type="text"
                            name="city"
                            placeholder="Enter City"
                            value={this.state.formData.city}
                            onChange={this.changeHandler} />
                            
                        <label className="form__label">Province or State</label>
                        <input className="form__input"
                            type="text"
                                name="province_state"
                                placeholder="Enter Province/State"
                            value={this.state.formData.province_state}
                                onChange={this.changeHandler} />
                            
                            <label className="form__label">Country</label>
                        <input className="form__input"
                            type="text"
                            name="country"
                                value={this.state.formData.country}
                                placeholder="Enter Country"
                            onChange={this.changeHandler} />
                        </label>
                    </div>
                    <div className="button-group">
                    <button
                        className="btn"
                        type="submit"
                        value="submit" >
                        Save
                    </button>
                    <button
                        onClick={ () => {this.props.history.goBack()} }
                        className="btn"
                        type="button"
                        value="cancel" >
                            Back
                    </button>
                        </div>
                </form>

            </div>
        );
    }
}

export default withRouter(UserAddEdit);
