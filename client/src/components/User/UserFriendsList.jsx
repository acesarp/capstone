
import React from 'react';
import axios from 'axios';

class UserFriendsList extends React.Component {

    	/**
	 *  Search event handler
	 * @param {Event} event 
	 */
    searchHandler = () => {
        if (!localStorage.getItem("userId")) return;
        
        const queryUrl = `${process.env.REACT_APP_SERVER_URL}/users/friends/${localStorage.getItem("userId")}/${localStorage.getItem("token")}`;
        //console.info(queryUrl);
        
        axios.get(queryUrl)
        .then(response => {
            //console.dir(response);
            this.setState({friends: response.data});

        })
        .catch(error => {
        console.error(error);
            this.setState({friends: []});
        });
    }
    

    render() {
        return (
                <div className="user-list">
                    <ul>
                        {this.props.friends && this.state.friends.map(item => {
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
