import React, { Component } from "react";
import axios from "axios";
import ChatRoom from "../commun/ChatRoom";
var crypto = require("crypto");

const ShowConnectedUserDiv = (user, onDivClick) => {
  return (
    <div
      onClick={onDivClick}
      style={{ border: "2px solid gray", padding: "12px", cursor: "pointer" }}
    >
      <img
        style={{
          marginRight: "15px",
          borderRadius: "50%"
        }}
        src={"images/" + user.image}
        alt=""
        width="30"
        height="30"
      />
      {user.firstName} {user.lastName}
    </div>
  );
};

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = { connectedUsers: [] };
    this.onDivClick = this.onDivClick.bind(this);
  }

  componentDidMount() {
    axios

      .get("api/auth/getConnectedUsers")
      .then(response => {
        this.setState({ connectedUsers: response.data.users });
        console.log("aaa", response);
      })
      .catch(error => {
        // const { errors } = error.response.data;
        console.log(error);
        // this.setState({ errors: errors });
      });
  }

  onDivClick(user) {
    this.setState({ chatingWith: user });
  }

  render() {
    return (
      <div
        className="margin_60"
        style={{ paddingLeft: "80px", paddingRight: "80px" }}
      >
        <div className="row">
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
        </div>
      </div>
    );
  }
}

export default ChatPage;
