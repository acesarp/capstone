
import React from 'react';
import ProfileAddEdit from './ProfileAddEdit';
import ProfileList from './ProfileFriendsList';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            biography: ""
        }
    }


    render() {
        return (
            <div className="App">
                <div className="biography">
                    { this.state.biography}
                </div>
                <ProfileList />
                <ProfileAddEdit />
                
            </div>
        );
    }
}

export default Profile;
