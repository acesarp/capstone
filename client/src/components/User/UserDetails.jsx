
import Axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';

class UserDetails extends React.Component {

    constructor(props) {
        super(props);
        console.log("this.props: ", this.props);
        this.state = {
            friends: [],
            user: this.props.location.state.user
        };
    }

    componentDidMount() {
        Axios.get(`${process.env.SERVER_URL}/users/friends/${localStorage.getItem("userId")}/${localStorage.getItem("token")}`)
            .then(response => {
                //console.log(response);
                const cloneState = this.state;
                cloneState.friends = response.data.friends;
                this.setState(cloneState);
            })
            .catch (error => console.error(error));
    }

    editHandler = () => {
        return (
            <Redirect to={{
                pathname: "/userdetails",
                state: {
                    user: this.state.user
                }
            }}/>  
        );
    }


    render() {
        return (

            <div className="user-details__wrapper">
                <div className="user-details__profile">
                    <h1 className="user-details__title" >Welcome {this.state.user && this.state.user.firstName}</h1>
                    
                    <div className="user-details__img-wrapper">
                        <img className="user-details__img" src={this.state.user && this.state.user.picture_large} alt="profile" />
                    </div>
                    
                    <ul className="user-details__list">
                        <li className="user-details__list--item" >
                            <div className="user-details__label">First name</div>
                            <p className="user-details__field">{this.state.user.firstName}</p>
                        </li>

                        <li className="user-details__list--item" >
                            <div className="user-details__label">Last name</div>
                            <p  className="user-details__field">{this.state.user.lastName}</p>
                        </li>

                        <li className="user-details__list--item" >
                            <div className="user-details__label">Date of Birth</div>
                            <p  className="user-details__field">{new Date(this.state.user.dob).toLocaleDateString()}</p>
                        </li>

                        <li className="user-details__list--item" >
                            <div className="user-details__label">About</div>
                            <p  className="user-details__field"> {this.state.user.about}</p>
                        </li>
                    </ul>
                    <button className="user-details__edit-btn" onClick={ this.editHandler }>Edit Profile</button>
                </div>

                <div className="user-list">
                    <ul>
                        {this.state.friends && this.state.friends.map(item => {
                            return <li key={item.id}>
                                <div>{item.displayName}</div>
                                <div>{ item.about }</div>
                            </li>;
                        })
                        }
                    </ul>
                </div>

            </div>
        );
    }
}

export default UserDetails;