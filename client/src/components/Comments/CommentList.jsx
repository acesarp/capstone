
import React from 'react';
import './App.css';
import axios from 'axios';

class CommentList extends React.Component {

    serverUrl = "localhost:5000"

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            isLoggedIn: false,
            formData: {
                title: "",
                text: ""
            }
            
        }
    }

    loadComments(userId) {
        axios.get("")
            .then()
            .catch();
    }

    render() {
        return (
            <div className="comment-list__wrapper">
                <h1>{ this.props.pagetitle }</h1>
                <ul className="comment-list">
                    {this.state.comments && this.state.comments.map(comment => {
                        return (
                            <li key={comment.commentId} id={comment.commentId}>
                                <div>
                                    {comment.title}
                                </div>
                                <div>
                                    {comment.text}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default CommentList;
