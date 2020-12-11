
import React from 'react';
import './App.css';

class EventDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      eventName: "NULL",
      isUserLoggedIn: false,
      buttonLabel: ""
    }
  }

  componentDidMount() {
    
  }

  changeHandler() {
    
  }

  render() {
    return (
      <div className="event-details">

            <div>
                <h1 className="">New Event</h1>
          <span>{ this.state.displayname}</span>
                <img src="./assets/" alt="profile" />
                <form>
                    <input onChange={this.changeHandler} />
                    <label></label>
                    <input name="Title" onChange={this.changeHandler} />
                    <label></label>
                    <input type="file" onChange={ this.changeHandler }/>
                    <label></label>
                    <input name="Description" onChange={this.changeHandler} />
                    <label></label>
                    <input name="date" onChange={this.changeHandler} />
                    <label></label>
                    <input name="Location" onChange={this.changeHandler} />
                    <label></label>
                    <input name="friends" onChange={this.changeHandler} />

                    <button type="submit">Add Event</button>
                </form>

        </div>

      </div>
    );
  }
}

export default EventDetails;
