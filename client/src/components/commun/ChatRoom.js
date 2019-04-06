import React, { Component } from "react";
import axios from "axios";
const io = require("socket.io-client");
var crypto = require("crypto");

const ShowMessageDiv = (message, owner) => {
  return (
    <div style={{ border: "3px solid gray", padding: "8px", margin: "8px" }}>
      {owner}: <br />
      {message}
    </div>
  );
};
const ShowTypingDiv = () => {
  return (
    <div style={{ border: "3px solid gray", padding: "8px", margin: "8px" }}>
      ...typing
    </div>
  );
};

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: "",
      typing: false
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  componentDidMount() {
    const socket = io.connect("http://localhost:5000");
    socket.on("send message server", message => {
      this.setState({ messages: [...this.state.messages, message] });
    });
    this.socket = socket.on("typing", () => {
      this.setState({ typing: true });
    });
    this.socket = socket.on("stop typing", () => {
      this.setState({ typing: false });
    });
  }

  componentWillUnmount() {
    //this.socket.disconnect();
  }

  onButtonClick(e) {
    this.socket.emit("stop typing", null);
    this.socket.emit("send message", {
      content: this.state.message,
      owner: this.props.user.firstName
    });
    this.setState({ message: "" });
  }

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value == "") {
      this.socket.emit("stop typing", null);
    } else {
      this.socket.emit("typing", null);
    }
  }
  //   onDivClick(user) {
  //     this.setState({ chatingWith: user });
  //   }

  render() {
    return (
      <div className="col-xl-6 col-lg-6 offset-1 patientDetails box_general_3">
        <h2>
          chat {this.props.user.firstName} {this.props.user.lastName} -{" "}
          {this.props.chatingWith.firstName} {this.props.chatingWith.lastName}
        </h2>
        {this.state.typing && ShowTypingDiv()}
        {this.state.messages &&
          this.state.messages.map(message => {
            return ShowMessageDiv(message.content, message.owner);
          })}
        <hr />
        <div>
          <input
            name="message"
            value={this.state.message}
            onChange={this.onInputChange}
          />
          <button onClick={this.onButtonClick}>send</button>
        </div>
      </div>
    );
  }
}

export default ChatRoom;
