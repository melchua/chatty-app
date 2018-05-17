import React, {Component} from 'react';


class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.onEnter = this.onEnter.bind(this);
    this.onUserEnter = this.onUserEnter.bind(this);
  }


  onEnter(evt) {
    // console.log(evt.target.value);
    // console.log(evt.key);
    if (evt.key === "Enter") {
      evt.preventDefault();
      this.props.addMessageItem(evt.target.value);
      evt.target.value ="";
    }
  }

  onUserEnter(evt) {
    if (evt.key === "Enter") {
      evt.preventDefault();
      this.props.updateCurrentUser(evt.target.value);
    }
  }

// when to put function in render, and when not to?

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onKeyPress={this.onUserEnter} placeholder="Your Name (Optional)" />
        <input onKeyPress={this.onEnter} name="newMessageInput" className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;
