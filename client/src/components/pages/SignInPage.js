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
      <div class="bg_color_2">
        <div class="container margin_60_35">
          <div id="login-2">
            <h1>Please login to our website!</h1>
            <form onSubmit={this.onFormSubmit}>
              <div class="box_form clearfix">
                <div class="box_login">
                  <a href="#0" class="social_bt facebook">
                    Login with Facebook
                  </a>
                  <a href="#0" class="social_bt google">
                    Login with Google
                  </a>
                  <a href="#0" class="social_bt linkedin">
                    Login with Linkedin
                  </a>
                </div>
                <div class="box_login last">
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onInputChange}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      placeholder="password"
                      value={this.state.password}
                      onChange={this.onInputChange}
                    />
                    {/* <a href="#0" class="forgot">
                      <small>Forgot password?</small>
                    </a> */}
                  </div>
                  <div class="form-group">
                    <input class="btn_1" type="submit" value="Login" />
                  </div>
                  {this.state.errors.global && (
                    <div style={{ color: "red" }}>
                      {this.state.errors.global}{" "}
                    </div>
                  )}
                  {this.state.errors.global &&
                    this.state.errors.global.includes("inactive") && (
                      <div style={{ color: "red" }}>
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
                  {this.state.success.global && (
                    <div>{this.state.success.global}</div>
                  )}
                </div>
              </div>
            </form>
            <p class="text-center link_bright">
              Do not have an account yet?{" "}
              <a href="#0">
                <strong>Register now!</strong>
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInPage;
