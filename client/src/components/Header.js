import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ListUsers from "./pages/ListUsers";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div class="layer" />

        <div id="preloader">
          <div data-loader="circle-side" />
        </div>

        <header class="header_sticky">
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-6">
                <div id="logo_home">
                  <NavLink to="/" activeClassName="active-link" exact={true}>
                    <h1
                      style={{
                        color: "#3f4079",
                        fontSize: "36px",
                        fontFamily: "Merriweather",
                        textShadow: "0 1px 1px #fff"
                      }}
                    >
                      healthChain
                    </h1>
                  </NavLink>
                </div>
              </div>
              <nav class="col-lg-9 col-6">
                <a
                  class="cmn-toggle-switch cmn-toggle-switch__htx open_close"
                  href="#0"
                >
                  <span>Menu mobile</span>
                </a>
                {!this.props.isAuthenticated && (
                  <ul id="top_access">
                    <li>
                      <NavLink
                        to="/signIn"
                        activeClassName="active-link"
                        exact={true}
                      >
                        <i class="pe-7s-user" />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/signUp"
                        activeClassName="active-link"
                        exact={true}
                      >
                        <i class="pe-7s-add-user" />
                      </NavLink>
                    </li>
                  </ul>
                )}

                <div class="main-menu">
                  <ul>
                    <li>
                      <NavLink
                        to="/"
                        activeClassName="active-link"
                        exact={true}
                      >
                        Home
                      </NavLink>
                    </li>

                    {this.props.user.role == "Doctor" ? (
                      <li>
                        <NavLink
                          to="/DoctorSpace"
                          activeClassName="active-link"
                          exact={true}
                        >
                          List Patients
                        </NavLink>
                      </li>
                    ) : null}

                    {this.props.user.role == "Patient" ? (
                      <li>
                        <NavLink
                          to="/ListUsers"
                          activeClassName="active-link"
                          exact={true}
                        >
                          Patient Space
                        </NavLink>
                      </li>
                    ) : null}

                    {this.props.user.role == "Pharmacist" ? (
                      <li>
                        <NavLink
                          to="/List_BoughtMedicament"
                          activeClassName="active-link"
                          exact={true}
                        >
                          Pharmacist Space
                        </NavLink>
                      </li>
                    ) : null}

                    {this.props.user.role == "ThirdParty" ? (
                      <li>
                        <NavLink
                          to="/List_Medicaments"
                          activeClassName="active-link"
                          exact={true}
                        >
                          ThirdParty Space
                        </NavLink>
                      </li>
                    ) : null}

                    {this.props.user.role == "SIMPLE_USER" ? (
                      <li className="submenu">
                        <a href="#0" className="show-submenu">
                          Register As
                          <i className="icon-down-open-mini" />
                        </a>
                        <ul>
                          <li>
                            <NavLink
                              to="/RegisterAsPatient"
                              activeClassName="active-link"
                              exact={true}
                            >
                              Patient
                            </NavLink>
                          </li>
                          <li>
                            {" "}
                            <NavLink
                              to="/RegisterAsDoctor"
                              activeClassName="active-link"
                              exact={true}
                            >
                              Doctor
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/RegisterAsPharmacist"
                              activeClassName="active-link"
                              exact={true}
                            >
                              Pharmacist
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/RegisterAsThirdParty"
                              activeClassName="active-link"
                              exact={true}
                            >
                              ThirdParty
                            </NavLink>
                          </li>
                        </ul>
                      </li>
                    ) : null}

                    {this.props.isAuthenticated && (
                      <React.Fragment>
                        <li>
                          <NavLink
                            to="/Chat"
                            activeClassName="active-link"
                            exact={true}
                          >
                            Chat
                          </NavLink>
                        </li>
                        <li class="submenu">
                          <a href="#0" class="show-submenu">
                            <img
                              style={{
                                marginRight: "15px",
                                borderRadius: "50%"
                              }}
                              src={"images/" + this.props.user.image}
                              alt=""
                              width="30"
                              height="30"
                            />
                            {this.props.user.firstName}{" "}
                            <i class="icon-down-open-mini" />
                          </a>
                          <ul>
                            <li>
                              {" "}
                              <NavLink
                                to="/profile"
                                activeClassName="active-link"
                                exact={true}
                              >
                                profile
                              </NavLink>
                            </li>
                            <li>
                              {" "}
                              <NavLink
                                to="/ProfileUpdateImage"
                                activeClassName="active-link"
                                exact={true}
                              >
                                change picture
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/personalinformation"
                                activeClassName="active-link"
                                exact={true}
                              >
                                Personal information
                              </NavLink>
                            </li>

                            {this.props.user.role === "Patient" ? (
                              <li>
                                <NavLink
                                  to="/list_access"
                                  activeClassName="active-link"
                                  exact={true}
                                >
                                  List access
                                </NavLink>
                              </li>
                            ) : null}

                            {this.props.user.role === "Patient" ? (
                              <li>
                                <NavLink
                                  to="/recom_predict"
                                  activeClassName="active-link"
                                  exact={true}
                                >
                                  Recommendation/Prediction
                                </NavLink>
                              </li>
                            ) : null}

                            <li>
                              <NavLink
                                onClick={this.props.logoutMethod}
                                to="/"
                                activeClassName="active-link"
                                exact={true}
                              >
                                logout
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                      </React.Fragment>
                    )}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;
