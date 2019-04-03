import React, { Component } from "react";
import axios from "axios";

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
      success: {}
    };

    console.log(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSpanClick = this.onSpanClick.bind(this);
  }

  onInputChange(e) {
    // console.log({ [e.target.name]: e.target.value });
    //console.log(e.currentTarget);
    this.setState({ [e.target.name]: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();

    axios
      .post("api/auth/signIn", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        const { token, user } = response.data;
        this.props.loginMethod(user.role, user, token);
        this.props.history.push("/");
        // this.setState({ errors: {} });
      })
      .catch(error => {
        const { errors } = error.response.data;
        this.setState({ errors: errors });
      });
  }

  onSpanClick(id) {
    axios
      .get(`api/auth/sendAccountActivationEmail/${id}`)
      .then(response => {
        this.setState({ success: response.data.success, errors: {} });
        // this.setState({ errors: {} });
      })
      .catch(error => {
        const { errors } = error.response.data;
        this.setState({ errors: errors, success: {} });
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={this.state.email}
            onChange={this.onInputChange}
            name="email"
          />

          <br />
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            value={this.state.password}
            onChange={this.onInputChange}
            name="password"
          />

          <br />

          <input type="submit" value="sign in" />
        </form>
        {this.state.errors.global && (
          <div style={{ color: "red" }}>{this.state.errors.global} </div>
        )}
        {this.state.errors.global &&
          this.state.errors.global.includes("inactive") && (
            <div>
              click{" "}
              <span
                style={{
                  cursor: "pointer",
                  color: "lightskyblue",
                  textDecoration: "underline"
                }}
                onClick={() => {
                  this.onSpanClick(this.state.errors.userId);
                }}
              >
                hire
              </span>{" "}
              to resent the activation e-mail{" "}
            </div>
          )}
        {this.state.success.global && <div>{this.state.success.global}</div>}
      </div>
    );
  }
}

export default SignInPage;
