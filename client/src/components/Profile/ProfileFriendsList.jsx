
import React from 'react';

class ProfileFriendsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            items: this.props.items
        }
    }


    render() {
        return (
            <div className="App">
                <div className="profile-list">
                    <table>
                    <th></th>
                        {this.state && this.state.items.map(item => {
                            return <tr key={ item.id }>item.displayName</tr>
                            })
                        }
                    </table>
                </div>
                
            </div>
        );
    }
}

export default ProfileFriendsList;
