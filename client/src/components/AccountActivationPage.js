import React, { Component } from "react";
import axios from "axios";

class AccountActivationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    console.log(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  componentDidMount() {
    console.log(this.props.match.params.id);
    axios
      .get(`api/auth/AccountActivation/${this.props.match.params.id}`)
      .then(response => {
        this.setState(response.data);
      })
      .catch(error => {
        const { errors } = error.response.data;
        console.log(errors);
        this.setState({ errors: errors });
      });
  }

  onButtonClick() {
    this.props.history.push("/signIn");
  }

  render() {
    return (
      <div>
        <div>welcome</div>
        {this.state.success && <div>{this.state.success.global}</div>}
        {this.state.errors && <div>{this.state.errors.global}</div>}
        <button onClick={this.onButtonClick}>signIn</button>
      </div>
    );
  }
}

export default AccountActivationPage;
