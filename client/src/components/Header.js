import React, {Component} from "react";
import {NavLink} from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <div className="layer"/>

                <div id="preloader">
                    <div data-loader="circle-side"/>
                </div>

                <header className="header_sticky">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-6">
                                <div id="logo_home">
                                    <h1
                                        style={{
                                            color: "#3f4079",
                                            fontSize: "36px",
                                            fontFamily: "Merriweather",
                                            textShadow: "0 1px 1px #fff"
                                        }}
                                    >
                                        healthChaine
                                    </h1>
                                </div>
                            </div>
                            <nav className="col-lg-9 col-6">
                                <a
                                    className="cmn-toggle-switch cmn-toggle-switch__htx open_close"
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
                                                <i className="pe-7s-user"/>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/signUp"
                                                activeClassName="active-link"
                                                exact={true}
                                            >
                                                <i className="pe-7s-add-user"/>
                                            </NavLink>
                                        </li>
                                    </ul>
                                )}

                                <div className="main-menu">
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
                                        <li>
                                            <NavLink
                                                to="/DoctorSpace"
                                                activeClassName="active-link"
                                                exact={true}
                                            >
                                                Doctor Space
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/PatientSpace"
                                                activeClassName="active-link"
                                                exact={true}
                                            >
                                                Patient Space
                                            </NavLink>
                                        </li>
                                        {this.props.isAuthenticated && (
                                            <li className="submenu">
                                                <a href="#0" className="show-submenu">
                                                    <img
                                                        style={{marginRight: "15px", borderRadius: "50%"}}
                                                        src={"images/" + this.props.user.image}
                                                        alt=""
                                                        width="30"
                                                        height="30"
                                                    />
                                                    {this.props.user.firstName}{" "}
                                                    <i className="icon-down-open-mini"/>
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
