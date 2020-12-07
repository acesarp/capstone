
import React from 'react';
import axios from 'axios';
import ClientProfileModel from '../../Models/ClientSignupModel';

class ProfileAddEdit extends React.Component {
    url = "localhost:5000";

    constructor(props) {
        super(props);
        this.state = {
            profileId: this.props.profileId ?? "",
            isLoggedIn: this.props.isEdit,
            value: "",
             formData: {
                userName: "",
                firstName: "",
                lastName: "",
                dob: new Date(),
                email: "",
                phone: "",
                gender: "",
                    address: {
                    street: "",
                        city: "",
                    provincestate: "",
                    country: ""
                }
            }
        }
    }

    async componentDidMount() {
        if (!this.state.profileId) return;
        try {
            const response = await axios.get(`${this.url}/profile/${this.state.profileId}`);
            const resObj = response.data[0];
            const cloneState = this.state;
            cloneState.formData = {
                userName: resObj.userName,
                firstName: resObj.firstName,
                lastName: resObj.lastName,
                dob: resObj.dob,
                email: resObj.email,
                phone: resObj.phone,
                gender: resObj.gender,
                avatar: resObj.avatar,
                address: {
                    street: resObj.street,
                    city: resObj.city,
                    provincestate: resObj.provincestate,
                    country: resObj.country
                }
            };
            this.setState(cloneState);
            //console.log(cloneState.formData);

        } 
        catch (error) {
            console.error(error);
        }
    }

    submitHandler(event) {
        event.preventDefault();
        let data = new FormData(event.target);

        const model = new ClientProfileModel(
            
            this.state.profileId ?? "",
            data.get("userName").toString(),
            data.get("password").toString(),
            data.get("firstName").toString(),
            data.get("lastName").toString(),
            new Date(data.get("dob").toString()),
            data.get("bio").toString(),
            data.get("email").toString(),
            data.get("phone").toString(),
            data.get("gender").toString(),
            data.get("avatar").toString(),
            {
                street: data.get("street").toString(),
                city: data.get("city").toString(),
                provincestate: data.get("provincestate").toString(),
                country: data.get("country").toString()
            }
        )
        console.log( model.toJSON())
        const method = this.props.location.state.id ? "PUT" : "POST"; // if no id is passed, POST will be used to create new record
        axios({
                method: method,
                url: `${this.url}/profile`,
                headers: { 'Content-Type': 'application/json' },
                data: model.toJSON()
            })
            .then(response => {
                //.console.info(response);
                event.target.reset();
            })
            .catch(error => console.error(error));

    }

    changeHandler(event) {
        const cloneStateState = this.state;
        cloneStateState[event.target.name]= event.target.value;
        this.setState(cloneStateState);
    }


    render() {
        return (
            <div className="add-edit-profile__wrapper">
                <h1>{ this.props.pagetitle }</h1>
                <form
                    className="profile-from"
                    onSubmit={this.submitHandler}>
                    <label>
                        User name
                        <input
                            className="profile-form__input"
                            type="text"
                            name="userName"
                            value={this.state.value} onChange={this.submitHandler} />
                    </label>
                    <label>
                        Password
                        <input
                            className="profile-form__input" type="text"
                            name="password" value={this.state.value} onChange={this.submitHandler} />
                    </label>
                    <label>
                        First name
                        <input
                            className="profile-form__input" type="text"
                            name="firstName" value={this.state.value} onChange={this.submitHandler} />
                    </label>
                    
                    <label>
                        Last Name
                        <input 
                            className="profile-form__input"
                            type="text"
                            name="lastName"
                            value={this.state.value}
                            onChange={this.submitHandler} />
                    </label>

                    <label>
                        Date of Birth
                        <input
                            className="profile-form__input"
                            type="date"
                            name="dob"
                            value={this.state.value}
                            onChange={this.submitHandler} />
                    </label>

                    <label>
                        Email
                    <input
                            className="profile-form__input"
                            type="email"
                            name="email"
                            value={this.state.value}
                            onChange={this.submitHandler} />
                    </label>
                    <label>
                        Phone number
                    <input
                            className="profile-form__input"
                            type="phone"
                            name="phone"
                            value={this.state.value}
                            onChange={this.submitHandler} />
                    </label>
                    <label>
                        Gender
                        <input
                            className="profile-form__input" 
                    type="text" 
                            name="gender"
                            value={this.state.value}
                            onChange={this.submitHandler} />
                    </label>
                    <label>
                        Bio
                        <input
                            className="profile-form__input"
                            type="text"
                            name="Biography"
                            value={this.state.value}
                            onChange={this.submitHandler} />
                    </label>
                    <label>
                        Avatar
                        <input className="profile-form__input"
                            type="file"
                            accept=""
                            name="avatar"
                            value={this.state.value}
                            onChange={this.submitHandler} />
                    </label>
                    <label>
                    <label>
                        Address
                        <input className="profile-form__input"
                            type="text"
                            name="street"
                            value={this.state.value}
                            onChange={this.submitHandler} />
                        <input className="profile-form__input"
                            type="text"
                            name="city"
                            value={this.state.value}
                                onChange={this.submitHandler} />
                                                    <input className="profile-form__input"
                            type="text"
                            name="provincestate"
                            value={this.state.value}
                                onChange={this.submitHandler} />
                                                    <input className="profile-form__input"
                            type="text"
                            name="country"
                            value={this.state.value}
                            onChange={this.submitHandler} />
                    </label>
                    <label></label>
                    
                        <input
                            className="submit-btn profile-form__input"
                            type="submit"
                            value="Submit" />
                </label>
                </form>
            
            </div>
        );
    }
}

export default ProfileAddEdit;
