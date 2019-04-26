import React, { Component } from "react";
import axios from "axios";
import ChatDiscussionMessage from "./ChatDiscussionMessage";
class ChatDiscussion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      discussion: {},
      messages: [],
      messageToSend: ""
    };
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.scroll = React.createRef();
    this.scroll2 = React.createRef();
  }

  updateStateWithNewMessage = newMessage => {
    this.setState({ messages: [...this.state.messages, newMessage] });
  };

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onButtonClick() {
    axios
      .post("api/chat/message/createMessage", {
        content: this.state.messageToSend,
        sender: this.props.user.id,
        conversation: this.props.discussion._id
      })
      .then(response => {
        this.props.onButtonClickEmitSocketMessage(
          this.props.discussion._id,
          response.data
        );
      });
  }

  /*
  if(discussion._id==discussionId){

  }else{

  }



  */

  componentDidUpdate() {
    this.scroll.current.scrollIntoView();
    this.scroll2.current.scrollIntoView();

    if (
      Object.keys(this.props.discussion).length != 0 &&
      this.props.discussion.constructor === Object &&
      this.props.discussion._id == ""
    ) {
      axios
        .post("api/chat/conversation/createConversation", {
          participants: this.props.discussion.participants,
          type: "oneToOne"
        })
        .then(response => {
          this.props.setChatDiscussion(response.data);

          axios
            .get(`api/chat/message/byConversationId/${response.data._id}`)
            .then(response => {
              let messages = response.data;
              if (
                Object.keys(this.props.newMessage).length != 0 &&
                this.props.newMessage.constructor === Object
              ) {
                messages = [...messages, this.props.newMessage];
              }
              this.setState({ messages: messages });

              //  this.setState({ discussion: response.data });
            })
            .catch(error => {
              // const { errors } = error.response.data;
              console.log(error);
              // this.setState({ errors: errors });
            });
          //  this.setState({ discussion: response.data });
        })
        .catch(error => {
          // const { errors } = error.response.data;
          console.log(error);
          // this.setState({ errors: errors });
        });
    }
  }
  render() {
    return (
      <div ref={this.scroll2} className="content">
        {this.props.userChatingWith && (
          <React.Fragment>
            <div className="contact-profile">
              <img src={"/images/" + this.props.userChatingWith.image} alt="" />
              <p>
                {this.props.userChatingWith.firstName}{" "}
                {this.props.userChatingWith.lastName}
              </p>
              <div className="social-media">
                <i className="fa fa-facebook" aria-hidden="true" />
                <i className="fa fa-twitter" aria-hidden="true" />
                <i className="fa fa-instagram" aria-hidden="true" />
              </div>
            </div>
            <div className="messages">
              <ul>
                {this.state.messages &&
                  this.state.messages.map(message => {
                    return (
                      <ChatDiscussionMessage
                        userImage={
                          message.sender == this.props.user.id
                            ? this.props.user.image
                            : this.props.userChatingWith.image
                        }
                        message={message}
                        isMine={message.sender == this.props.user.id}
                      />
                    );
                  })}
                <li ref={this.scroll} />
              </ul>
            </div>
            <div className="message-input">
              <div className="wrap">
                <input
                  type="text"
                  name="messageToSend"
                  value={this.state.messageToSend}
                  onChange={this.onInputChange}
                  placeholder="Write your message..."
                />
                <button onClick={this.onButtonClick} className="submit">
                  <i className="icon-chat" aria-hidden="true" />
                </button>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ChatDiscussion;
