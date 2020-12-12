
import axios from 'axios';
import React from 'react';
import { Redirect, BrowserRouter , Route } from 'react-router-dom';
class UserDetails extends React.Component {

    constructor(props) {
        super(props);
        console.log("this.props: ", this.props);
        this.state = {
            friends: [],
            user: this.props.user
        };
    }

    componentDidMount() {
        // Axios.get(`${process.env.SERVER_URL}/users/friends/${sessionStorage.getItem("userId")}/${sessionStorage.getItem("token")}`)
        //     .then(response => {
        //         //console.log(response);
        //         const cloneprops = this.props;
        //         cloneprops.friends = response.data.friends;
        //         this.setState(cloneprops);
        //     })
        //     .catch (error => console.error(error));
    }

    editHandler = () => {
        return (
                <Redirect to={{
                    pathname: "/userAddEdit",
                    props: {
                        user: this.props.user
                    }
                }}/>
        );
    }


    render() {

        const tag = this.props.user &&
            <div className="user-details__wrapper">
                <div className="user-details__header">
                    <div className="user-details__profile">
                        <h1 className="user-details__title" >Welcome {this.props.user.firstName}</h1>
                    
                        <div className="user-details__img-wrapper">
                            <img className="user-details__img" src={this.props.user && this.props.user.picture_large} alt="profile" />
                        </div>
                    </div>
                    <ul className="user-details__list">
                        <li className="user-details__list--item" >
                            <div className="user-details__label">First name</div>
                            <p className="user-details__field">{this.props.user.firstName}</p>
                        </li>

                        <li className="user-details__list--item" >
                            <div className="user-details__label">Last name</div>
                            <p className="user-details__field">{this.props.user.lastName}</p>
                        </li>

                        <li className="user-details__list--item" >
                            <div className="user-details__label">Date of Birth</div>
                            <p className="user-details__field">{new Date(this.props.user.dob).toLocaleDateString()}</p>
                        </li>

                        <li className="user-details__list--item" >
                            <div className="user-details__label">About</div>
                            <p className="user-details__field"> {this.props.user.about}</p>
                        </li>
                    </ul>
                    <button className="user-details__edit-btn" onClick={this.editHandler}>Edit Profile</button>
                </div>

                <div className="user-list">
                    <ul>
                        {this.props.friends && this.props.friends.map(item => {
                            return <li key={item.id}>
                                <div>{item.displayName}</div>
                                <div>{item.about}</div>
                            </li>;
                        })
                        }
                    </ul>
                </div>

            </div>;
    
        return tag || <></>;
    }
}

export default UserDetails;