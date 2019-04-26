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
      <div class="bg_color_2">
        <div class="container margin_60_35">
          <div id="login-2">
            <h1>Please login to Findoctor!</h1>
            <form>
              <div
                class="box_form clearfix d-flex"
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <div class="box_login last">
                  <h1 style={{ color: "gray" }}>
                    {" "}
                    {this.state.success && this.state.success.global}
                    {this.state.errors && this.state.errors.global}
                  </h1>
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

export default AccountActivationPage;
