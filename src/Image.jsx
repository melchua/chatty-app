import React, {Component} from 'react';

class Image extends Component {
  constructor(props) {
    super(props);
    this.detectImage = this.detectImage.bind(this);
  }

  // detect image
  detectImage(content) {
    const regexp = /\S*\.(jpg|png|gif)/ ;
    const imgsrc = content.match(regexp);
    // console.log("hello:", imgsrc[0]);
    return imgsrc[0];
  }

  render() {
    return (
      <div>
        <img className="Message-image" src={this.detectImage(this.props.imgsrc)}/>
      </div>
    );
  }
}
export default Image;
