
import React from 'react';
import axios from 'axios';
import ClientUserModel from '../../Models/ClientSignupModel';
import { Redirect } from 'react-router-dom';

class UserAddEdit extends React.Component {
    serverUrl = process.env.REACT_APP_SERVER_URL

    constructor(props) {
        super(props);
        console.info("UserAddEdit props: ", this.props);
        this.state = {
            isLoggedIn: this.props.isloggedIn ?? false,
            userId: (this.props.location && this.props.location.state.id) ?? "",
            formData: {
                userName: "Allen22",
                password: "p@$$w0rd",
                firstName: "Guelph",
                lastName: "Allen",
                dob: "1957-02-10",
                email: "all@email.ca",
                phone: "555-555-5555",
                gender: "male",
                about: "Me me me",
                avatar: "",
                street: "Fake st",
                city: "Seattle",
                provincestate: "AL",
                country: "France"
            }
        };
    }

    async componentDidMount() {
        console.log("User: ", this.state.userId);
        if (!this.state.userId) return;
        try {
            console.log("Getting user...");
            const response = await axios.get(`${this.serverUrl}/users/${this.state.userId}`);
            const resObj = response.data[0];
            const cloneState = this.state;
            cloneState.formData = {
                userName: resObj.userName,
                firstName: resObj.firstName,
                lastName: resObj.lastName,
                password: resObj.password,
                dob: resObj.dob,
                email: resObj.email,
                phone: resObj.phone,
                gender: resObj.gender,
                avatar: resObj.avatar,
                about: resObj.about,
                street: resObj.street,
                city: resObj.city,
                provincestate: resObj.provincestate,
                country: resObj.country
            };
            this.setState(cloneState);
            //console.log(cloneState.formData);

        }
        catch (error) {
            console.error(error);
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

                reader.onload = ((resolve_) => {
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

            const method = this.state.id ? "PUT" : "POST"; // if no id is passed, POST will be used to create new record
            axios({
                method: method,
                url: `${this.serverUrl}/users`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: model.toJSON()
            })
                .then(response => {
                    console.info(response.data.newUser.userId);
                    this.setUpAuthorization(response.data.token, response.data.newUser.userId);
                    method === "POST" ?? this.props.dataHandler(this.state.newUser);
                    event.target.reset();
                })
                .catch(error => console.error(error));
        }
        catch (error) {
            console.error("formSubmitHandler() => ", error);
        }

    };

    setUpAuthorization(token, userId) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        const cloneState = this.state;
        cloneState.isLoggedIn = true;
        this.setState(cloneState);
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
