
import React from 'react';

class UserFriendsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            items: this.props.items
        }
    }


    render() {
        return (
            <div className="App">
                <div className="user-list">

                    <ul>
                        {this.state && this.state.items.map(item => {
                            return <li key={item.id}>

                                <h1>{item.displayName}</h1>
                                <img src={item.avatar} alt=""/>
                                </li>
                            })
                        }
                    </ul>
                </div>
                
            </div>
        );
    }
}

export default UserFriendsList;
