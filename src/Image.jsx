import React, {Component} from 'react';

class Image extends Component {
  constructor(props) {
    super(props);
  }

  detectImage(content) {
    const regexp = /\S*\.(jpg|png|gif)/ ;
    const imgsrc = content.match(regexp);
    return imgsrc;
  }

  render() {
    return (

     this.detectImage(this.props.imgsrc) ?
      <span className="message-content">
        <img className="message-image" src={this.detectImage(this.props.imgsrc)[0]}/>
      </span>
      :
      <div></div>


    );
  }
}
export default Image;
