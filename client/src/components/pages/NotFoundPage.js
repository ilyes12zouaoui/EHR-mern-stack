import React, { Component } from "react";
class NotFoundPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="error_page">
        <div class="container">
          <div class="row justify-content-center text-center">
            <div class="col-xl-7 col-lg-9">
              <h2>
                404 <i class="icon_error-triangle_alt" />
              </h2>
              <p>
                We're sorry, but the page you were looking for doesn't exist.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
