import React, {Component} from 'react';

class Message extends Component {
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
          </div>
        :
          <div className="message system">
            {content}
          </div>
      }

{/* { type === 'incomingMessage' && <message />}   */}

      </div>
    );
  }
}
export default Message;
