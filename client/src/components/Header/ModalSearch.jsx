import React from 'react';

class ModalSearch extends React.Component {


  render() {

    return (
        <div className="modal__window">
            {this.props.friends &&
                
                <div className="modal__wrapper">
                <h1>Search results:</h1>
                <div className="modal__content">

                    <ul className="modal__list">
                        {this.props.friends && this.props.friends.map(item => {
                            return (
                                <li key={item.userId} className="modal__item"  onClick={ () => this.props.friendDetailsHandler(item.userId) }>
                                    <div>
                                        {item.firstName}
                                    </div>
                                    <div>
                                        {item.lastName}
                                    </div>
                                    <div>
                                        <img className="friend__avatar" src={item.picture_med} alt="avatar" />
                                    </div>
                            
                                </li>
                            );
                        })}
                    </ul>
                    </div>
            </div>
                
            }
        </div>
    
        );
    }
}

export default ModalSearch;
