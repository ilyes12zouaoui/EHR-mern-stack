import React, { Component } from "react";
class ChatSidePaneUser extends Component {
  state = {};
  render() {
    return (
      <li
        onClick={() => {
          this.props.addActiveClassName();
          this.props.onDivClick();
        }}
        className={+this.props.isActive ? "contact active" : "contact"}
      >
        <div className="wrap">
          <span
            className={
              "contact-status " +
              (this.props.user.isLoggedIn ? "online" : "busy")
            }
          />
          <img src={"/images/" + this.props.user.image} alt="" />
          <div className="meta">
            <p className="name">
              {this.props.user.firstName} {this.props.user.lastName}
            </p>
            {this.props.isNotif && <p className="preview">new message !</p>}
          </div>
        </div>
      </li>
    );
  }
}

export default ChatSidePaneUser;
