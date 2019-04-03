import React, { Component } from "react";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.user.email}</div>;
  }
}

export default Profile;
