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
    this.state = {currentUser: { name: "Buddy" },
                  messages: [ {id: 1, username: "Bob", content: "Bob bobs for blueberries"}, {id: 2, username: "Jill Kill", content: "Lalallaal"} ]
                };
    this.addMessageItem = this.addMessageItem.bind(this);
  }

    // in App.jsx
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  // update messages to add new message

  addMessageItem(chatBarInput) {
    const prevMessageList = this.state.messages;
    const newMessage = { id: rando(), username: this.state.currentUser.name, content: chatBarInput};
    const newMessageList = [...prevMessageList, newMessage];
    this.setState( {messages: newMessageList})
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} addMessageItem={this.addMessageItem} />

      </div>
    );
  }
}
export default App;
