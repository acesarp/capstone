
import React from 'react';
import './App.css';
import axios from 'axios';

class EventAddEdit extends React.Component {
    serverUrl = "localhost:5000"

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            formData: {
                userName: "",
                name: "",
                firstName: "",
                lastName: "",
                dob: new Date(),
                location: "",
                gender: ""
            }
            
        }
    }

    formHandler(event) {
        let formData = event.target.values;

        axios.post(`${this.serverUrl}`, {
            headers: {

            },
            data: {
                name: formData.name,
                firstName: formData.firstName,
                lastName: formData.lastName,
                date: formData.dob,
                location: formData.location,
                participants: formData.participants
            }
        })
        .then(response => {

        })
        .catch(error => console.error(error));

    }

    changeHandler(event) {
        //console.log([event.target.name], event.target.value);
        const currentState = this.state;
        currentState.formData[event.target.name] = event.target.value;
        this.setState(currentState);
    }


    render() {
        return (
            <div className="add-edit-event__wrapper">
                <h1>{ this.props.pagetitle }</h1>
                <div className="biography">
                    { this.state.biography}
                </div>
                <form className="event-from" onSubmit={this.formHandler}>
                    <label htmlFor=""></label>
                    <input className="event-form__input" type="text" name="name" onChange={this.formHandler} />
                    <label htmlFor=""></label>
                    <input className="event-form__input" type="text" name="firstName" onChange={this.formHandler} />
                    <label htmlFor=""></label>
                    <input className="event-form__input" type="text" name="description" onChange={this.formHandler} />
                    <label htmlFor=""></label>
                    <input className="event-form__input" type="date" name="date" onChange={this.formHandler} />
                    <label htmlFor=""></label>
                    <input className="event-form__input" type="location" name="location" onChange={this.formHandler} />
                    <label htmlFor=""></label>
                    <select
                        className="event-form__input" 
                        name="participants"
                        onChange={this.formHandler} >
                        {this.state && this.state.friends.map(friend => {
                            return <option aria-checked key={friend.profileId}>{friend.displayname}</option>
                        })}
                        
                    </select>
                    <label htmlFor=""></label>
                    <input className="event-form__input" type="text" name="Biography" onChange={this.formHandler} />
                    <label htmlFor=""></label>
                    <input className="event-form__input" type="submit"/>
                </form>
                
            </div>
        );
    }
}

export default EventAddEdit;
