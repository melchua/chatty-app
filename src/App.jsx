import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


// helper functions

export const rando = (alphabet => {
  const alphabetLength = alphabet.length;
  const randoIter = (key, n) => {
    if (n === 0) {
      return key;
    }
    const randoIndex = Math.floor(Math.random() * alphabetLength);
    const randoLetter = alphabet[randoIndex];
    return randoIter(key + randoLetter, n - 1);
  };
  return () => randoIter("", 10);
})("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

//

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: { name: "Anonymous" },
      messages: [ ], // messages coming from server will be stored here as they arrive
    };
    this.addMessageItem = this.addMessageItem.bind(this);
    this.sendMessageItem = this.sendMessageItem.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onmessage = (event) => {
    // save data
      const newMessage = JSON.parse(event.data);

      switch(newMessage.type) {
        case "incomingMessage":
        case "incomingNotification":
        // handle incoming message
          console.log(newMessage);
          const prevMessageList = this.state.messages;
          const newMessageList = [...prevMessageList, newMessage];
          this.setState( {messages: newMessageList});
        break;
        // handle incoming notification
        // break;
        default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + newMessage.type);
      }


    };
  }

  // update messages to add new message

  addMessageItem(content) {
    const username = this.state.currentUser.name;
    const newMessage = { username , content: content, type: "postMessage"};
    this.sendMessageItem(newMessage);
  }

  updateCurrentUser(username) {
    console.log("updating ", username);


    // send notification
    const prevUsername = this.state.currentUser.name;

    this.setState({currentUser: {name: username}});
    const content = `${prevUsername} changed their name to ${username}`;
    const notification = {
        type: "postNotification",
        content
    };
    console.log("update that name", notification);
    this.sendMessageItem(notification);
  }

// send message to server
  sendMessageItem(messageText) {
    console.log(JSON.stringify(messageText));
    this.socket.send(JSON.stringify(messageText));
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} addMessageItem={this.addMessageItem} sendMessageItem={this.sendMessageItem} updateCurrentUser={this.updateCurrentUser} />

      </div>
    );
  }
}
export default App;
