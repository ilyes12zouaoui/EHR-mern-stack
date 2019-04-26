import React, { Component } from "react";
import axios from "axios";

class ProfileUpdateImage extends Component {
  constructor(props) {
    super(props);
    this.state = { file: null, errors: {}, success: {} };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", this.state.file);

    axios
      .put("api/auth/changeProfilePicture", formData, {
        headers: { "content-type": "multipart/form-data" }
      })
      .then(response => {
        this.setState({ success: response.data.success, errors: {} });
        this.props.updateUserAfterImageChangeMethod(
          response.data.success.imageName
        );
      })
      .catch(error => {
        if (error.response) {
          const { errors } = error.response.data;
          this.setState({ errors: errors, success: {} });
        } else {
          console.log(error);
        }
      });
  }

  onInputChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  render() {
    return (
      <div class="bg_color_2">
        <div class="container margin_60_35">
          <div id="login-2">
            <form onSubmit={this.onFormSubmit}>
              <div
                class="box_form clearfix d-flex"
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <div class="box_login last">
                  <div class="form-group">
                    <input
                      type="file"
                      name="image"
                      onChange={this.onInputChange}
                    />
                  </div>
                  <div class="form-group">
                    <input class="btn_1" type="submit" value="update" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileUpdateImage;
