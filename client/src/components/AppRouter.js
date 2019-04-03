import React, { Component } from "react";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import axios from "axios";

import LandingPage from "./LandingPage";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import NotFoundPage from "./NotFoundPage";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";
import AccountActivationPage from "./AccountActivationPage";

function checkIfUserConnectedAndReturnUser() {
  let user = {
    isAuthenticated: false,
    role: "",
    user: {}
  };

  if (localStorage.JWT && localStorage.user) {
    user = {
      isAuthenticated: true,
      role: JSON.parse(localStorage.user).role,
      user: JSON.parse(localStorage.user)
    };
    axios.defaults.headers.common["JWT"] = localStorage.JWT;
  }

  return user;
}

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = checkIfUserConnectedAndReturnUser();

    this.loginMethod = this.loginMethod.bind(this);
    this.logoutMethod = this.logoutMethod.bind(this);
  }

  loginMethod(role, user, token) {
    localStorage.setItem("JWT", token);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common["JWT"] = token;
    this.setState({ role, user, isAuthenticated: true });
  }

  logoutMethod() {
    delete axios.defaults.headers.common["JWT"];
    localStorage.removeItem("JWT");
    localStorage.removeItem("user");
    this.setState({ role: "", user: {}, isAuthenticated: false });
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <div>
            <NavLink to="/" activeClassName="active-link" exact={true}>
              Home
            </NavLink>
            {!this.state.isAuthenticated && (
              <React.Fragment>
                <NavLink
                  to="/signIn"
                  activeClassName="active-link"
                  exact={true}
                >
                  Sign in
                </NavLink>
                <NavLink
                  to="/signUp"
                  activeClassName="active-link"
                  exact={true}
                >
                  Sign up
                </NavLink>
              </React.Fragment>
            )}
            {this.state.isAuthenticated && (
              <React.Fragment>
                <NavLink
                  to="/profile"
                  activeClassName="active-link"
                  exact={true}
                >
                  profile
                </NavLink>
                <NavLink
                  onClick={this.logoutMethod}
                  to="/"
                  activeClassName="active-link"
                  exact={true}
                >
                  logout
                </NavLink>
              </React.Fragment>
            )}
          </div>
          <Switch>
            <Route path="/" component={LandingPage} exact />
            <Route
              path="/signIn"
              render={({ match, history, location }) => (
                <SignInPage history={history} loginMethod={this.loginMethod} />
              )}
            />
            <Route path="/signUp" component={SignUpPage} />
            AccountActivationPage
            <Route
              path="/accountActivation/:id"
              component={AccountActivationPage}
            />
            <ProtectedRoute
              isAuthenticated={this.state.isAuthenticated}
              path="/profile"
              component={() => <Profile user={this.state.user} />}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
