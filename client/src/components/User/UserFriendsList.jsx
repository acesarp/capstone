
import React from 'react';

class UserFriendsList extends React.Component {


    render() {
        return (
                <div className="user-list">
                    <ul>
                        {this.props.friends && this.props.friends.map(item => {
                            return <li key={item.id}>

                                <h1>{item.displayName}</h1>
                                <img src={item.avatar} alt=""/>
                                </li>
                            })
                        }
                    </ul>
                </div>
                
        );
    }
}

export default UserFriendsList;
