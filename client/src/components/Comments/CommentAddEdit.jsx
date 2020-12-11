
import React from 'react';
import './App.css';
import axios from 'axios';

class CommentAddEdit extends React.Component {

    serverUrl = "localhost:5000"

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            formData: {
                title: "",
                text: ""
            }
            
        }
    }

    formHandler(comment) {
        let formData = comment.target.values;

        axios.post(`${this.serverUrl}`, {
            headers: {

            },
            data: {
                title: formData.title,
                text: formData.text,
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => console.error(error));

    }

    changeHandler(comment) {
        //console.log([comment.target.name], comment.target.value);
        const currentState = this.state;
        currentState.formData[comment.target.name] = comment.target.value;
        this.setState(currentState);
    }


    render() {
        return (
            <div className="add-edit-comment__wrapper">
                <h1>{ this.props.pagetitle }</h1>
                <form className="comment-from" onSubmit={this.formHandler}>
                    <label>
                        <input className="comment-form__input" type="text" name="title" onChange={this.changeHandler} />
                    </label>
                    <label>
                        <input className="comment-form__input" type="text" name="text" onChange={this.changeHandler} />
                    </label>
                    <label>
                        <input className="comment-form__input" type="submit" />
                    </label>
                </form>
                
            </div>
        );
    }
}

export default CommentAddEdit;
