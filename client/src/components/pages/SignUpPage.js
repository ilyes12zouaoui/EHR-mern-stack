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
      <div class="bg_color_2">
        <div class="container margin_60_35">
          <div id="register">
            <h1>Please register to our website!</h1>
            <div class="row justify-content-center">
              <div class="col-md-5">
                <form onSubmit={this.onFormSubmit}>
                  <div class="box_form">
                    <div class="form-group">
                      <label>First name</label>
                      <input
                        name="firstName"
                        type="text"
                        class="form-control"
                        value={this.state.firstName}
                        onChange={this.onInputChange}
                      />
                    </div>
                    <div class="form-group">
                      <label>Last name</label>
                      <input
                        type="text"
                        name="lastName"
                        class="form-control"
                        value={this.state.lastName}
                        onChange={this.onInputChange}
                      />
                    </div>
                    <div class="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        class="form-control"
                        value={this.state.email}
                        onChange={this.onInputChange}
                      />
                    </div>
                    <div class="form-group">
                      <label>Password</label>
                      <input
                        name="password"
                        type="password"
                        class="form-control"
                        id="password1"
                        value={this.state.password}
                        onChange={this.onInputChange}
                      />
                    </div>
                    <div class="form-group">
                      <label>Confirm password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="password2"
                        name="confirmationPassword"
                        value={this.state.confirmationPassword}
                        onChange={this.onInputChange}
                      />
                    </div>

                    <div class="form-group text-center add_top_30">
                      <input class="btn_1" type="submit" value="Submit" />
                    </div>
                    <div id="pass-info" class="clearfix">
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
                  <p class="text-center">
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
