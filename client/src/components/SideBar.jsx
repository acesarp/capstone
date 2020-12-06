
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './App.css';

class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            biography: ""
        }
    }


    render() {
        return (
            <nav className="App">
                <Link to="" className="biography">  { this.state.biography }   </Link>
            </nav>
        );
    }
}

export default SideBar;
