import React, { Component } from "react";
import axios from "axios";

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmationPassword: "",
      firstName: "",
      lastName: "",
      sexe: true,
      errors: {},
      success: {}
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(e) {
    // console.log({ [e.target.name]: e.target.value });
    //console.log(e.currentTarget);
    this.setState({ [e.target.name]: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();

    axios
      .post("api/auth/signUp", {
        email: this.state.email,
        password: this.state.password,
        confirmationPassword: this.state.confirmationPassword,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        sexe: this.state.sexe
      })
      .then(response => {
        this.setState({ success: response.data.success, errors: {} });
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
            name="email"
            value={this.state.email}
            onChange={this.onInputChange}
          />
          <br />
          <label htmlFor="firstName">firstName</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.onInputChange}
          />

          <br />
          <label htmlFor="lastName">lastName</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.onInputChange}
          />
          <br />
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onInputChange}
          />

          <br />
          <label htmlFor="confirmationPassword">confirmationPassword</label>
          <input
            id="confirmationPassword"
            type="password"
            name="confirmationPassword"
            value={this.state.confirmationPassword}
            onChange={this.onInputChange}
          />
          <br />
          <input type="submit" value="sign up" />
        </form>
        {this.state.errors && this.state.errors.email && (
          <div style={{ color: "red" }}>{this.state.errors.email}</div>
        )}
        {this.state.errors && this.state.errors.firstName && (
          <div style={{ color: "red" }}>{this.state.errors.firstName}</div>
        )}
        {this.state.errors && this.state.errors.lastName && (
          <div style={{ color: "red" }}>{this.state.errors.lastName}</div>
        )}
        {this.state.errors && this.state.errors.password && (
          <div style={{ color: "red" }}>{this.state.errors.password}</div>
        )}
        {this.state.errors && this.state.errors.confirmationPassword && (
          <div style={{ color: "red" }}>
            {this.state.errors.confirmationPassword}
          </div>
        )}
        {this.state.success && this.state.success.global && (
          <div style={{ color: "green" }}>{this.state.success.global}</div>
        )}
      </div>
    );
  }
}

export default SignInPage;
