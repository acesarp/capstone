
import React from 'react';
import './App.css';

class ProfileAddEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            biography: ""
        }
    }


    render() {
        return (
            <div className="add-edit-profile__wrapper">
                <div className="biography">
                    { this.state.biography}
                </div>
                <form className="add-edit-profile__from">
                    <input />
                    <input />
                    <input />
                    <input />

                </form>
                
            </div>
        );
    }
}

export default ProfileAddEdit;
