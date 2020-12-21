
import React from 'react';
import axios from 'axios';
import BackIcon from '../../assets/images/icons/back-arrow.png';
class EventList extends React.Component {

    constructor() {
        super();
        this.state = {
            events: []
        };
    }

    componentDidMount() {
        console.info("componentDidMount");
        if (!sessionStorage.getItem("userId")) return;
        
        const queryUrl = `${process.env.REACT_APP_SERVER_URL}/events/all/${this.props.user.userId}`; // /${sessionStorage.getItem("token")}`;
        console.info(queryUrl);
        
        axios.get(queryUrl)
        .then(response => {
            console.dir("response", response.data);
            this.setState({events: response.data});

        })
        .catch(error => {
            console.log("error", error);
            this.setState({events: []});
        });
    }
    

    render() {
            //console.dir(this.state);
        return (
            <div className="user-list">
                <button className="event-form__btn" onClick={this.props.history.goBack}>Back</button>
                
                <h1 className="white-text">My Events</h1>
                <div className="event-list__container" >
                        {this.state.events && this.state.events.map(item => {
                            return <div key={item.id} className="event-list__card">
                                    <button className="delete-btn--small">
                                    X
                                    </button>
                                <div>
                                    <div className="user-list__card--row-1">
                                        <div className="event-list__pic--container">
                                        <img className="event-list__pic" src={`https://randomuser.me/api/portraits/women/${Math.ceil(Math.random() * 20)}.jpg`} alt="" />
                                        <img className="event-list__pic" src={`https://randomuser.me/api/portraits/men/${Math.ceil(Math.random() * 20)}.jpg`} alt="" />
                                        <img className="event-list__pic" src={`https://randomuser.me/api/portraits/women/${Math.ceil(Math.random()*20)}.jpg`} alt=""/>
                                        </div>
                                            <h1 className="header__avatar">{item.name}</h1>
                                        
                                        <p className="header__avatar">{item.address}</p>
                                        </div >
                                            <span className="user-list__card--row-1-a">{item.description}</span>
                                    </div>
                                </div>
                            })
                        }
                </div>
            </div>
                
        );
    }
}

export default EventList;
