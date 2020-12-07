
import React from 'react';
class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: "NULL",
      isUserLoggedIn: false,
      buttonLabel: ""
    }
  }

  componentDidMount() {
    
  }

  clickHandler() {
    
  }

  render() {
    return (
      <header className="App">
        <img src="" alt="logo" />
        <div>
          <span>{ this.state.displayname}</span>
          <img src="./assets/" alt="profile" />
          <button onClick={ this.clickHandler }>{ this.state.buttonLabel }</button>
        </div>

      </header>
    );
  }
}

export default Header;
