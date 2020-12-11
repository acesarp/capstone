
import React from 'react';
import './App.css';
import axios from 'axios';

class EventAddEdit extends React.Component {
    serverUrl = "localhost:5000"
    submitBtnLabel = "Add";
    
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
        event.preventDefault();
        let formData = event.target.values;
        let method_ = "";
        if (this.state.eventId) {
            method_ = "post";
            this.submitBtnLabel = "Add Event"
        }
        else {
            method_ = "put";
            this.submitBtnLabel = "Edit Event"
        }
        axios(`${this.serverUrl}/events`, {
            headers: {
                method: method_
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
            console.error(response);
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

                <form className="event-from" onSubmit={this.formHandler}>
                    <label className="event-form__label">
                        <input className="event-form__input" type="text" name="name" onChange={this.changeHandler} />
                    </label>
                    <label className="event-form__label">
                        <input className="event-form__input" type="text" name="firstName" onChange={this.changeHandler} />
                    </label>
                        <label className="event-form__label">
                    <input className="event-form__input" type="text" name="description" onChange={this.changeHandler} />
                    </label>
                        <label className="event-form__label">
                        <input className="event-form__input" type="date" name="date" onChange={this.changeHandler} />
                    </label>
                    <label className="event-form__label">
                        <input className="event-form__input" type="location" name="location" onChange={this.changeHandler} />
                    </label>
                    <label className="event-form__label">
                        <select
                            className="event-form__input" 
                            name="participants"
                            onChange={this.changeHandler}
                            multiple>
                            
                            {this.state && this.state.friends.map(friend => {
                                return <option aria-checked key={friend.profileId} value={friend.profileId}>{friend.displayname}</option>
                            })} 
                        </select>
                    </label>
                    <label className="event-form__label">
                        <input className="event-form__input" type="submit" value={ this.submitBtnLabel } />
                    </label>
                </form>
            </div>
        );
    }
}

export default EventAddEdit;
