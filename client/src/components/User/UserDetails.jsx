
import Axios from 'axios';
import React from 'react';

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
                console.log(response);
                const cloneState = this.state;
                cloneState.friends = response.data.friends;
                this.setState(cloneState);
            })
            .catch (error => console.error(error));
    }


    render() {
        return (

            <div className="user-details__wrapper">
                <div className="user-details__profile">
                <h1 className="user-details__title" >Welcome {this.state.user && this.state.user.firstName}</h1>
                    <img src={this.state.user && this.state.user.picture_med} alt="avatar" />
                    <ul className="user-details__list">
                        <li>
                            <div>First name</div>
                            <div>{this.state.user.firstName}</div>
                        </li>
                        <li>
                            <div>Last name</div>
                                <div>{this.state.user.lastName}</div>
                        </li>
                        <li>
                            <div>Date of Birth</div>
                            <div>{new Date(this.state.user.dob).toLocaleDateString()}</div>
                        </li>
                        <li>
                            <div>About</div>
                            <div> {this.state.user.about}</div>
                        </li>
                    </ul>
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