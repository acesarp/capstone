
import React from 'react';
import UserSignupEdit from './UserAddEdit';
import UserList from './UserFriendsList';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            about: ""
        }
    }


    render() {
        return (
            <div className="about__wrapper">
                <div className="about">
                    { this.state.about}
                </div>
                <UserList />
                <UserSignupEdit />
                
            </div>
        );
    }
}

export default User;
