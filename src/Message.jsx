import React, {Component} from 'react';

import Image from './Image.jsx';
// import getRandomDadJoke from './dadjoke.js';

class Message extends Component {
  constructor(props) {
    super(props);
  }

  // returnImageURL(content) {
  //   const regexp = /\S*\.(jpg|png|gif)/ ;
  //   const imgsrc = content.match(regexp);
  //   return imgsrc;
  // }

  render() {
    let {username, content, type} = this.props.message;
    const regexp = /\S*\.(jpg|png|gif)/ ;

    const msgContent = content.replace(regexp, "");

    return (
      <div>
{/* read conditional rendering react to learn best practice */}
      {
        type === "incomingMessage"
        ?
          <div className="message">
            <span className="message-username">{username}</span>
            <span className="message-container">

            <div className="message-content">{msgContent}</div>
            <Image imgsrc={content}/>
            </span>
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
