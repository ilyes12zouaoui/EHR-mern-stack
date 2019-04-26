import React, { Component } from "react";
import moment from "moment";
class ChatDiscussionMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: "",
      typing: false
    };
  }
  render() {
    return (
      <li className={this.props.isMine ? "sent" : "replies"}>
        <img src={"/images/" + this.props.userImage} alt="" />
        <p>{this.props.message.content}</p>
        <p className="timep">
          {moment(this.props.message.sentTime).format("dddd hh:mm")}
        </p>
      </li>
    );
  }
}

export default ChatDiscussionMessage;
