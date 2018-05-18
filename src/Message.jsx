import React, {Component} from 'react';

import Image from './Image.jsx';
// import getRandomDadJoke from './dadjoke.js';

class Message extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {username, content, type} = this.props.message;
    return (
      <div>
{/* read conditional rendering react to learn best practice */}
      {
        type === "incomingMessage"
        ?
          <div className="message">
            <span className="message-username">{username}</span>
            <span className="message-content">{content}</span>
            <Image imgsrc={content} detectImage={this.detectImage} />

          </div>
        :
          <div className="message system">
            {content}

          </div>
      }

{ /* { type === 'incomingMessage' && <message />}   */}

      </div>
    );
  }
}
export default Message;
