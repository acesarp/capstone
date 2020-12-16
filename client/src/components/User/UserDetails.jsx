import EditIcon from '../../assets/images/icons/edit-icon.svg';
import BackIcon from '../../assets/images/icons/color-icons/png/back-icon.png';
import AddIcon from '../../assets/images/icons/color-icons/png/073-add.png';
import { Link } from 'react-router-dom';
import React from 'react';

class UserDetails extends React.Component {

    constructor(props) {
        super(props);
        console.log("this.props: ", this.props);
        this.state = {
            friends: [],
            user: this.props.user || this.props.friendClicked
        };
    }

    render() {
        const titleMessage = this.props.isOwner ? `Welcome ${this.props.user.firstName}` : `${this.props.user.firstName}`;
        const tag = this.props.user &&
            
            <div className="user-details">
                <div className="user-details__header">
                    <div className="user-details__profile">

                    {!this.props.isOwner &&
                        <div
                            className="user-details__edit-btn"
                            onClick={ this.props.history.goBack } >
                            <img className="icon user-details__edit--icon" src={BackIcon} alt="" />
                        </div>
                    }

                        <h1 className="user-details__title" >{ titleMessage }</h1>
                    <Link className="user-details__img-wrapper" to={"/userFriendsList"}>
                            <img className="user-details__img" src={this.props.user && this.props.user.avatar} alt="profile" />
                        </Link>
                        <div className="user-details__img-wrapper">
                            <img className="user-details__img" src={this.props.user && this.props.user.picture_large} alt="profile" />
                        </div>
                    </div>
                    
            </div>
            <div className="user-details__middle-section">
                <div className="user-details__list-title">Profile details</div>
                
                {this.props.isOwner &&
                    <div
                        className="user-details__edit-btn"
                        onClick={ () => this.props.history.push( "/userAddEdit") }>
                        <img className="icon user-details__edit--icon" src={EditIcon} alt="" />
                    </div>
                }

                {!this.props.isOwner &&
                    <div
                        className="user-details__edit-btn"
                        onClick={ () => this.props.addFriendHandler(this.props.user.userId) }>
                        <img className="icon user-details__edit--icon" src={AddIcon} alt="" />
                    </div>
                }

                </div>
            <ul className="user-details__list">

                {this.props.isOwner &&
                    <li className="user-details__list--item" >
                        <div className="user-details__label">First name</div>
                        <p className="user-details__field">{this.props.user.username}</p>
                    </li>
                }

                <li className="user-details__list--item" >
                    <div className="user-details__label">Last name</div>
                    <p className="user-details__field">{this.props.user.lastName}</p>
                </li>
                <li className="user-details__list--item" >
                    <div className="user-details__label">Email</div>
                    <p className="user-details__field"> {this.props.user.email}</p>
                </li>
                <li className="user-details__list--item" >
                    <div className="user-details__label">Gender</div>
                    <p className="user-details__field"> {this.props.user.gender}</p>
                </li>
                <li className="user-details__list--item" >
                    <div className="user-details__label">Phone number</div>
                    <p className="user-details__field"> {this.props.user.phone}</p>
                </li>

                <li className="user-details__list--item" >
                            <div className="user-details__label">Date of Birth</div>
                            <p className="user-details__field">{new Date(this.props.user.dob).toLocaleDateString()}</p>
                        </li>

                        <li className="user-details__list--item" >
                            <div className="user-details__label">About</div>
                            <p className="user-details__field"> {this.props.user.about}</p>
                    </li>
                    <li className="user-details__list--item">
                        <label className="user-details__label">Address:</label>
                        <div className="user-details__list--item" >
                            <div className="user-details__label">City</div>
                            <p className="user-details__field"> {this.props.user.city}</p>
                        </div>
                            <div className="user-details__list--item" >
                            <div className="user-details__label">Province/State</div>
                            <p className="user-details__field"> {this.props.user.province_state}</p>
                        </div>
                            <div className="user-details__list--item" >
                            <div className="user-details__label">Country</div>
                            <p className="user-details__field"> {this.props.user.country}</p>
                        </div>
                        </li>
                    </ul>
                </div>
            ;
    
        return tag || <></>;
    }
}

export default UserDetails;