import React, {Component} from 'react';


class Message extends Component {
  render() {
    const {username, content} = this.props.message;
    return (
      <div>

        <div className="message">
          <span className="message-username">{username}</span>
          <span className="message-content">{content}</span>
        </div>
{/*        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>*/}
      </div>
    );
  }
}
export default Message;
