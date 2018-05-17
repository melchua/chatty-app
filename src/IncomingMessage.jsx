import React, {Component} from 'react';

class IncomingMessage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // const {username, content, type} = this.props.message;
    return (
      <div className="message">
        <span className="message-username">{username}</span>
        <span className="message-content">{content}</span>
        <Image imgsrc={content} detectImage={this.detectImage} />
      </div>
    );
  }
}
export default IncomingMessage;
