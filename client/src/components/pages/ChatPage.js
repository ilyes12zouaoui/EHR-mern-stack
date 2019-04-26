import React, { Component } from "react";
import axios from "axios";
import ChatRoom from "../commun/ChatRoom";
import "../assets/css/ChatPage.css";
import ChatSidePanel from "../commun/ChatSidePanel";
import ChatDisussion from "../commun/ChatDisussion";
const io = require("socket.io-client");

var crypto = require("crypto");

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.ChatDiscussionElement = React.createRef();
    this.ChatSidePanel = React.createRef();
    this.state = {
      discussion: { participants: [], type: "oneToOne", _id: "" },
      userChatingWith: {},
      updateChatDiscussion: true,
      chooseWhatToDo: {},
      changeOfLogStatus: {},
      newMessage: {}
    };
    this.onDivClick = this.onDivClick.bind(this);
    this.setChatDiscussion = this.setChatDiscussion.bind(this);
    this.onButtonClickEmitSocketMessage = this.onButtonClickEmitSocketMessage.bind(
      this
    );
    this.props.socket.on(
      "new-message-from-server",
      ({ conversationId, message }) => {
        this.setState({ chooseWhatToDo: { conversationId, message } });
      }
    );
    this.props.socket.on("loged-in-user", userId => {
      this.setState({ changeOfLogStatus: { userId, status: true } });
    });
    this.props.socket.on("loged-out-user", userId => {
      this.setState({ changeOfLogStatus: { userId, status: false } });
    });
  }

  setChatDiscussion(discussion) {
    this.setState({ discussion: discussion });
  }

  onDivClick(currentUserId, userChatingWith) {
    this.setState({
      discussion: {
        participants: [currentUserId, userChatingWith._id],
        type: "oneToOne",
        _id: ""
      },
      userChatingWith: userChatingWith,
      newMessage: {}
    });
  }

  componentDidUpdate() {
    if (
      Object.keys(this.state.chooseWhatToDo).length != 0 &&
      this.state.chooseWhatToDo.constructor === Object
    ) {
      if (
        this.state.discussion._id == this.state.chooseWhatToDo.conversationId
      ) {
        this.ChatDiscussionElement.current.updateStateWithNewMessage(
          this.state.chooseWhatToDo.message
        );
      } else {
        this.ChatSidePanel.current.updateWithUserIdNotif(
          this.state.chooseWhatToDo.message.sender
        );
      }

      this.setState({ chooseWhatToDo: {} });
    }

    if (
      Object.keys(this.state.changeOfLogStatus).length != 0 &&
      this.state.changeOfLogStatus.constructor === Object
    ) {
      this.ChatSidePanel.current.UpdateWithChangeOfLogState(
        this.state.changeOfLogStatus
      );
      this.setState({ changeOfLogStatus: {} });
    }
  }

  onButtonClickEmitSocketMessage(conversationId, message) {
    this.props.socket.emit("new-message-from-client", {
      conversationId: conversationId,
      message: message
    });
  }

  render() {
    return (
      <div>
        <div id="framecontainer">
          <div id="frame">
            <ChatSidePanel
              ref={this.ChatSidePanel}
              onDivClick={this.onDivClick}
              user={this.props.user}
            />
            <ChatDisussion
              ref={this.ChatDiscussionElement}
              onButtonClickEmitSocketMessage={
                this.onButtonClickEmitSocketMessage
              }
              newMessage={this.state.newMessage}
              updateChatDiscussion={this.state.updateChatDiscussion}
              user={this.props.user}
              setChatDiscussion={this.setChatDiscussion}
              discussion={this.state.discussion}
              userChatingWith={this.state.userChatingWith}
            />
          </div>
        </div>
        {/* <div className="row">
          <div className="col-xl-5 col-lg-5  patientDetails box_general_3">
            {this.state.connectedUsers.map(user => {
              if (user._id == this.props.user.id) return;
              return ShowConnectedUserDiv(user, () => {
                this.onDivClick(user);
              });
            })}
          </div>
          {this.state.chatingWith && (
            <ChatRoom
              user={this.props.user}
              chatingWith={this.state.chatingWith}
            />
          )}
        </div> */}
      </div>
    );
  }
}

export default ChatPage;
