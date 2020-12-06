
import React from 'react';
import './App.css';

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
                
            </div>
        );
    }
}

export default Profile;
