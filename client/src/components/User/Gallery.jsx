
import React from 'react';
import BackIcon from '../../assets/images/icons/back-arrow.png';

export default class Gallery extends React.Component {
  
  state = {
    
    arrayOfImages: []
  }

  componentDidMount() {
    const cloneState = this.state;
      const images = this.importAll(require.context('../../assets/gallery'), false, /\.(png|jpe?g|svg)$/);
          const keys = Object.keys(images);
            keys.forEach(key => {
              cloneState.arrayOfImages.push(images[key].default);
            }
          )
          this.setState(cloneState);
          console.dir( cloneState );
    }

      importAll(r) {
        let images_ = {};
        r.keys().map((item, index) =>  images_[item.replace('./', '')] = r(item) );
        return images_;
      }




    render() {        
      return (
        <div className="gallery__component--wrapper">
                <button className="event-form__btn" onClick={this.props.history.goBack}>Back</button>
          <h1 className="font--light">My pictures</h1>
          <div className="gallery__container">

            {this.state.arrayOfImages && this.state.arrayOfImages.map(image => {
                    return (
                      <div key={ image } class="gallery">
                            <img src={image} alt="gallery item"/>
                    </div> );
                })
                }
          </div>
          </div>
      );
    }

}