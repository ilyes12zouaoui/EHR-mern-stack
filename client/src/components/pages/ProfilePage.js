import React, { Component } from "react";
class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div class="container margin_60">
        <div class="row">
          <div class="col-xl-8 col-lg-8 offset-lg-2">
            <nav id="secondary_nav">
              <div class="container">
                <ul class="clearfix">
                  <li>
                    <a href="#section_1" class="active">
                      General info
                    </a>
                  </li>
                  <li>
                    <a href="#section_2" />
                  </li>
                  <li>
                    <a href="#sidebar" />
                  </li>
                </ul>
              </div>
            </nav>
            <div id="section_1">
              <div class="box_general_3">
                <div class="profile">
                  <div class="row">
                    <div class="col-lg-5 col-md-4">
                      <figure>
                        <img
                          src={"images/" + this.props.user.image}
                          alt=""
                          class="img-fluid"
                        />
                      </figure>
                    </div>
                    <div class="col-lg-7 col-md-8">
                      <h1>
                        {" "}
                        {this.props.user.firstName} {this.props.user.lastName}
                      </h1>
                      <ul class="contacts">
                        <li>
                          <h6>E-mail</h6>{" "}
                          <a href="#">{this.props.user.email}</a>
                        </li>
                        <li>
                          <h6>Sexe</h6>{" "}
                          <a href="#">
                            {this.props.user.sexe ? "female" : "male"}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
