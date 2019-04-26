import React, { Component } from "react";
import ChatSidePanelUser from "./ChatSidePanelUser";
import axios from "axios";

class ChatSidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      activeIndex: -1,
      userIdNotificate: "",
      userChangeStatus: {}
    };
    this.addActiveClassName = this.addActiveClassName.bind(this);
  }

  componentDidMount() {
    axios
      .get("api/chat/user")
      .then(response => {
        this.setState({ allUsers: response.data });
      })
      .catch(error => {
        // const { errors } = error.response.data;
        console.log(error);
        // this.setState({ errors: errors });
      });
  }

  updateWithUserIdNotif = userId => {
    this.setState({ userIdNotificate: userId });
  };

  UpdateWithChangeOfLogState = userChangeStatus => {
    this.setState({ userChangeStatus });
  };

  addActiveClassName(index) {
    this.setState({ activeIndex: index });
  }

  render() {
    return (
      <div id="sidepanel">
        <div id="profile">
          <div class="wrap">
            <img
              id="profile-img"
              src={"/images/" + this.props.user.image}
              class="online"
              alt=""
            />
            <p>
              {this.props.user.firstName} {this.props.user.lastName}
            </p>
            <i class="fa fa-chevron-down expand-button" aria-hidden="true" />
            <div id="status-options">
              <ul>
                <li id="status-online" class="active">
                  <span class="status-circle" />
                  <p>Online</p>
                </li>
                <li id="status-away">
                  <span class="status-circle" />
                  <p>Away</p>
                </li>
                <li id="status-busy">
                  <span class="status-circle" />
                  <p>Busy</p>
                </li>
                <li id="status-offline">
                  <span class="status-circle" />
                  <p>Offline</p>
                </li>
              </ul>
            </div>
            <div id="expanded">
              <label for="twitter">
                <i class="fa fa-facebook fa-fw" aria-hidden="true" />
              </label>
              <input name="twitter" type="text" value="mikeross" />
              <label for="twitter">
                <i class="fa fa-twitter fa-fw" aria-hidden="true" />
              </label>
              <input name="twitter" type="text" value="ross81" />
              <label for="twitter">
                <i class="fa fa-instagram fa-fw" aria-hidden="true" />
              </label>
              <input name="twitter" type="text" value="mike.ross" />
            </div>
          </div>
        </div>
        <div id="contacts">
          <ul>
            {this.state.allUsers &&
              this.state.allUsers.map((user, index) => {
                if (
                  this.state.userChangeStatus &&
                  this.state.userChangeStatus.userId
                ) {
                  if (this.state.userChangeStatus.userId.userId == user._id) {
                    user.isLoggedIn = this.state.userChangeStatus.status;
                  }
                }
                if (user._id == this.props.user.id) return;
                else
                  return (
                    <ChatSidePanelUser
                      onDivClick={() => {
                        this.props.onDivClick(this.props.user.id, user);
                        this.setState({ userIdNotificate: "" });
                      }}
                      isNotif={
                        this.state.userIdNotificate == user._id ? true : false
                      }
                      user={user}
                      isActive={this.state.activeIndex == index ? true : false}
                      addActiveClassName={() => {
                        this.addActiveClassName(index);
                      }}
                    />
                  );
              })}
          </ul>
        </div>
      </div>
    );
  }
}

export default ChatSidePanel;
