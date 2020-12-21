import EditIcon from '../../assets/images/icons/edit.png';
import BackIcon from '../../assets/images/icons/back-arrow.png';
import AddIcon from '../../assets/images/icons/color-icons/png/073-add.png';
import React from 'react';

class UserDetails extends React.Component {

    constructor(props) {
        super(props);
        console.log("this.props: ", this.props);
        this.state = {
            friends: [],
            user: this.props.user || this.props.friendClicked || this.props.location.state.user
        };

    }

    render() {
        const titleMessage = this.props.isOwner ? `Welcome ${this.props.user.firstName}` : `${this.props.user.firstName}`;
        const tag = this.props.user &&

            <div className="user-details">
                <div className="user-details__header">

                    {!this.props.isOwner &&
                        <button
                            className="user-details__edit-btn"
                            onClick={this.props.history.goBack} >
                            <img src={ BackIcon} class="material-icons large white-text" alt=""/>
                        </button>
                    }

                </div>

                <h1 className="font--light header__title" >{titleMessage}</h1>

                <div className="user-details__middle-section">
                    <div className="user-details__list-title">Profile details</div>

                    {this.props.isOwner &&
                        <div
                            className="user-details__edit-btn"
                            onClick={() => this.props.history.push("/userAddEdit")}>
                            <img className="icon user-details__edit--icon" src={EditIcon} alt="edit icon" />
                        </div>
                    }

                    {!this.props.isOwner &&
                        <div
                            className="user-details__edit-btn"
                            onClick={() => this.props.addFriendHandler(this.props.user.userId)}>
                            <img className="icon user-details__edit--icon" src={AddIcon} alt="" />
                        </div>
                    }

                </div>
                <ul className="user-details__list">

                    {this.props.isOwner &&

                        <li className="user-details__item col-span-2" >
                            <div className="user-details__card">
                                <div className="user-details__label">Username</div>
                                <p className="user-details__field">{this.props.user.username}</p>
                            </div>
                        </li>

                    }


                    <li className="user-details__item" >
                        <div className="user-details__card">
                            <div className="user-details__label">
                                First name:
                            </div>
                            <div className="user-details__field">
                                {this.props.user.firstName}
                            </div>
                        </div>
                    </li>
                    <li className="user-details__item" >
                        <div className="user-details__card">
                            <div className="user-details__label">
                                Last name:
                            </div>
                            <p className="user-details__field">
                                {this.props.user.lastName}
                            </p>
                        </div>

                    </li>
                    <li className="user-details__item" >
                        <div className="user-details__card">
                            <div className="user-details__label">
                                Email
                            </div>
                            <div className="user-details__field">
                                {this.props.user.email}
                            </div>
                        </div>
                    </li>
                    <li className="user-details__item" >
                        <div className="user-details__card">
                            <div className="user-details__label">Gender</div>
                            <p className="user-details__field"> {this.props.user.gender}</p>
                        </div>
                    </li>
                    <li className="user-details__item" >
                        <div className="user-details__card">
                            <div className="user-details__label">
                                Phone number
                            </div>
                            <div className="user-details__field">
                                {this.props.user.phone}
                            </div>
                        </div>
                    </li>

                    <li className="user-details__item" >
                        <div className="user-details__card">
                            <span className="user-details__label">Date of Birth</span>
                            <span className="user-details__field">{new Date(this.props.user.dob).toLocaleDateString()}</span>
                        </div>
                    </li>

                    <li className="user-details__item" >
                        <div className="user-details__card">
                            <div className="user-details__label">
                                About
                            </div>
                            <div className="user-details__field">
                                {this.props.user.about}
                            </div>
                        </div>
                    </li>

                <div className="user-details__card--large">
                    <div className="user-details__card--title">Address:</div>
                    <li className="user-details__item">
                        <div className="user-details__card">

                        <div className="user-details__label">
                            City
                        </div>
                        <div className="user-details__field">
                                {this.props.user.city}
                            </div>

                        </div>
                    </li>
                    <li className="user-details__item">
                        <div className="user-details__card">
                            <div className="user-details__label">
                                Province/State
                                </div>
                        <div className="user-details__field">
                            {this.props.user.province_state}
                        </div>

                        </div>
                    </li>
                    <li className="user-details__item">
                        <div className="user-details__card">

                        <div className="user-details__label">
                            Country
                            </div>
                        <div className="user-details__field">
                            {this.props.user.country}
                        </div>
                        </div>

                    </li>
</div>
                </ul>



            </div>;



        return tag || <></>;
    }
}

export default UserDetails;