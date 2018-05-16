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
      currentUser: { name: "Buddy" },
      messages: [ ] // messages coming from server will be stored here as they arrive
    };
    this.addMessageItem = this.addMessageItem.bind(this);
    this.sendMessageItem = this.sendMessageItem.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onmessage = (event) => {
    // save data
      const newMessage = JSON.parse(event.data);
      console.log(newMessage);
      const prevMessageList = this.state.messages;
      const newMessageList = [...prevMessageList, newMessage];
      this.setState( {messages: newMessageList});
    };
  }

  // update messages to add new message

  addMessageItem(content) {
    const username = this.state.currentUser.name;
    const newMessage = { username , content: content};
    this.sendMessageItem(newMessage);


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
        <ChatBar currentUser={this.state.currentUser} addMessageItem={this.addMessageItem} sendMessageItem={this.sendMessageItem} />

      </div>
    );
  }
}
export default App;
