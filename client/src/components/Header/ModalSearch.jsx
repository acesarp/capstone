import React from 'react';

class ModalSearch extends React.Component {

  render() {

    return (
        <div className="modal__window">
            {this.props.friends &&
                
                <div className="modal__wrapper">
                    <div className="modal__content">
                    <ul className="modal__list">
                        {this.props.friends.map(item => {
                            return (
                                <li key={item.userId} className="modal__item" >
                                    <span>
                                        {item.firstName} {item.lastname}
                                    </span>
                                    <div>
                                        <img className="friend__avatar" src={item.picture_med} alt="avatar" />
                                    </div>
                            
                            </li>);
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
