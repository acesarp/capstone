
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
      <header className="header__wrapper">
        <div className="header__wrapper">
        <img src="" alt="logo" />
        <div>
          <span>{ this.state.displayname}</span>
          <img src="./assets/" alt="profile" />
          <button onClick={this.clickHandler}>{this.state.buttonLabel}</button>
            { }
        </div>
</div>
      </header>
    );
  }
}

export default Header;
