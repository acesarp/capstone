
import React from 'react';
import axios from 'axios';
import BackIcon from '../../assets/images/icons/color-icons/png/back-icon.png';
import DeleteIcon from '../../assets/images/icons/color-icons/png/057-minus.png';

class UserFriendsList extends React.Component {
    constructor() {
        super();
        this.state = {
            friends: []
        };
    }

    componentDidMount() {
        console.info("componentDidMount");
        if (!sessionStorage.getItem("userId")) return;
        
        const queryUrl = `${process.env.REACT_APP_SERVER_URL}/users/friends/all/${sessionStorage.getItem("userId")}/${sessionStorage.getItem("token")}`;
        console.info(queryUrl);
        
        axios.get(queryUrl)
        .then(response => {
            console.dir("response", response.data);
            this.setState({friends: response.data});

        })
        .catch(error => {
            console.log("error", error);
            this.setState({friends: []});
        });
    }
    

    render() {
        //console.dir(this.state);
        return (
            <div className="user-list">
                <button className="event-form__btn" onClick={this.props.history.goBack}>Back</button>
                
                <h1 className="font--light">My friends list</h1>
                <div className="user-list__container">
                        {this.state.friends && this.state.friends.map(item => {
                            return <div key={item.id} className="user-list__card">
                                <button className="delete-btn--small">
                                    X
                                </button>
                                <div className="user-list__card--col-1">
                                        <div className="user-list__card--row-1">
                                            <div className="">
                                                <img className="header__avatar" src={item.avatar} alt="friend" />
                                            </div>
                                                <span className="header__avatar">{item.displayName}</span>
                                        </div >

                                        <div className="user-list__card--row-1">

                                            <span className="user-list__card--row-1-a">{item.firstName} {item.lastName}</span>

                                        </div>
                                </div>
                                </div>
                            })
                        }
                </div>
            </div>
                
        );
    }
}

export default UserFriendsList;
