import React, { Component } from "react";

class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div style={{ float: "right" }}>
          <a style={{ marginRight: "10px" }}>signIn</a>
          <a>signUp</a>
        </div>
      </div>
    );
  }
}

export default NavBar;
