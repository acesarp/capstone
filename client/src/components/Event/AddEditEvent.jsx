
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react'

class EventAddEdit extends React.Component {
    submitBtnLabel = "Save";
    
    constructor(props) {
        super(props);

        console.dir("EventAddEdit props: ", this.props);
        this.state = {
            isLoggedIn: false,
            friends: [],
            formData: {
                name: "",
                date: new Date(),
                description: "",
                location: "",
                participants: []
            }
        }
        }



    componentDidMount() {		
		const queryUrl = `${process.env.REACT_APP_SERVER_URL}/users/friends/all/${sessionStorage.getItem("userId")}/${sessionStorage.getItem("token")}`;
		axios.get(queryUrl)
		.then(response => {
            console.log(response.data);
            const cloneState = this.state;
            cloneState.friends = [];
            response.data.forEach(element => {
                console.log("element: ", element);
                cloneState.friends.push({ key: element.userId , text: `${element.firstName} ${element.lastName}`, value: element.userId });
            });
            console.log(cloneState.friends);
            this.setState(cloneState);
		})
		.catch(error => {
		console.error(error);
		});
	}


    changeHandler = (event, result) => {
        //console.log(event.target.value || (result && result.value));
        const currentState = this.state;
        if (!result) {
            currentState.formData[event.target.name] = event.target.value;
        }
        else {
            currentState.formData[result.name] = result.value;
        }

        this.setState(currentState);
    }


    render() {
        return (
            <React.Fragment>
                <div className="event__wrapper">
                    <div className="event__header">
                <h1 className="font--light">{this.props.eventId && this.props.pageTitle } Event </h1>
                <button className="event-form__btn" onClick={this.props.history.goBack}>Back</button>
                    </div>
                    <form className="event-form" onSubmit={(e) => { e.preventDefault(); this.props.submitEventHandler(this.state.formData); }}>
                        
                    <label className="event-form__label">Title </label>
                        <input
                            className="event-form__input"
                            type="text"
                            name="name"
                            value={ this.state.formData.name}
                            onChange={this.changeHandler} />
            
                    <label className="event-form__label">Description </label>
                        <input
                            className="event-form__input"
                            type="text"
                            name="description"
                            onChange={this.changeHandler}
                            value={ this.state.formData.description}/>
                    
                    <label className="event-form__label">Date</label>
                        <input
                            className="event-form__input"
                            type="date"
                            name="date"
                            value={ this.state.formData.date}
                            onChange={this.changeHandler} />
    
                    <label className="event-form__label">Location</label>
                        <input
                            className="event-form__input"
                            type="location"
                            name="location"
                            value={ this.state.location}
                            onChange={this.changeHandler} />
                        
                        <label className="event-form__label">Participants</label>
                        <Dropdown
                            placeholder='Add friends'
                            name="participants"
                            fluid
                            multiple
                            selection
                            options={this.state.friends}
                            onChange={this.changeHandler}
                            value={this.state.formData.participants }/>

                        <button className="event-form__btn" type="submit" value="submit" >Save</button>
                </form>
                </div>
            </React.Fragment>
        );
    }
}

export default EventAddEdit;


EventAddEdit.propTypes = {
    name: PropTypes.string,
    lastName: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    participants: PropTypes.array,
    submitEventHandler: PropTypes.func
}


