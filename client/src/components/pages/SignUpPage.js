import React, { Component } from "react";
import axios from "axios";
class SignUpPage extends Component {
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
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onFormSubmit = (e) => {
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
      <div className="bg_color_2">
        <div className="container margin_60_35">
          <div id="register">
            <h1>Please register to our website!</h1>
            <div className="row justify-content-center">
              <div className="col-md-5">
                <form onSubmit={this.onFormSubmit}>
                  <div className="box_form">
                    <div className="form-group">
                      <label>First name</label>
                      <input
                        name="firstName"
                        type="text"
                        className="form-control"
                        value={this.state.firstName}
                        onChange={this.onInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Last name</label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        value={this.state.lastName}
                        onChange={this.onInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={this.state.email}
                        onChange={this.onInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        name="password"
                        type="password"
                        className="form-control"
                        id="password1"
                        value={this.state.password}
                        onChange={this.onInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password2"
                        name="confirmationPassword"
                        value={this.state.confirmationPassword}
                        onChange={this.onInputChange}
                      />
                    </div>

                    <div className="form-group text-center add_top_30">
                      <input className="btn_1" type="submit" value="Submit" />
                    </div>
                    <div id="pass-info" className="clearfix">
                      {this.state.errors && this.state.errors.email && (
                        <div
                          style={{
                            color: "red",
                            fontWeight: 500,
                            margin: "5px"
                          }}
                        >
                          {this.state.errors.email}
                        </div>
                      )}
                      {this.state.errors && this.state.errors.firstName && (
                        <div
                          style={{
                            color: "red",
                            fontWeight: 500,
                            margin: "5px"
                          }}
                        >
                          {this.state.errors.firstName}
                        </div>
                      )}
                      {this.state.errors && this.state.errors.lastName && (
                        <div
                          style={{
                            color: "red",
                            fontWeight: 500,
                            margin: "5px"
                          }}
                        >
                          {this.state.errors.lastName}
                        </div>
                      )}
                      {this.state.errors && this.state.errors.password && (
                        <div
                          style={{
                            color: "red",
                            fontWeight: 500,
                            margin: "5px"
                          }}
                        >
                          {this.state.errors.password}
                        </div>
                      )}
                      {this.state.errors &&
                        this.state.errors.confirmationPassword && (
                          <div
                            style={{
                              color: "red",
                              fontWeight: 500,
                              margin: "5px"
                            }}
                          >
                            {this.state.errors.confirmationPassword}
                          </div>
                        )}
                      {this.state.success && this.state.success.global && (
                        <div
                          style={{
                            color: "green",
                            fontWeight: 500,
                            margin: "5px"
                          }}
                        >
                          {this.state.success.global}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-center">
                    <small>
                      Has voluptua vivendum accusamus cu. Ut per assueverit
                      temporibus dissentiet. Eum no atqui putant democritum,
                      velit nusquam sententiae vis no.
                    </small>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
