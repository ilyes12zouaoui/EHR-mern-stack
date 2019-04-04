import React, {Component} from "react";
import {BrowserRouter, Route, NavLink, Switch} from "react-router-dom";
import axios from "axios";

import ProtectedRoute from "./commun/ProtectedRoute";
import Header from "./Header";
import Footer from "./Footer";
import IndexPage from "./pages/IndexPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AccountActivationPage from "./pages/AccountActivationPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileUpdateImage from "./pages/ProfileUpdateImage";
import DoctorSpacePage from "./pages/DoctorSpacePage";
import ListUsers from "./pages/ListUsers";
import Personalinformation from "./pages/Personalinformation";
import Userdetails from "./pages/Userdetails";

function checkIfUserConnectedAndReturnUser() {
    let user = {
        isAuthenticated: false,
        role: "",
        user: {}
    };

    if (localStorage.Authorization && localStorage.user) {
        user = {
            isAuthenticated: true,
            role: JSON.parse(localStorage.user).role,
            user: JSON.parse(localStorage.user)
        };
        axios.defaults.headers.common["Authorization"] = localStorage.Authorization;
    }

    return user;
}

class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.state = checkIfUserConnectedAndReturnUser();

        this.loginMethod = this.loginMethod.bind(this);
        this.logoutMethod = this.logoutMethod.bind(this);
        this.updateUserAfterImageChangeMethod = this.updateUserAfterImageChangeMethod.bind(
            this
        );
    }

    loginMethod(role, user, token) {
        localStorage.setItem("Authorization", `JWT ${token}`);
        localStorage.setItem("user", JSON.stringify(user));
        axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
        this.setState({role, user, isAuthenticated: true});
    }

    updateUserAfterImageChangeMethod(imageName) {
        if (localStorage.user) {
            let user = JSON.parse(localStorage.user);
            user.image = imageName;
            localStorage.setItem("user", JSON.stringify(user));
            this.setState({user});
        }
    }

    logoutMethod() {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("Authorization");
        localStorage.removeItem("user");
        this.setState({role: "", user: {}, isAuthenticated: false});
    }

    render() {
        return (
            <BrowserRouter>
                <Header
                    logoutMethod={this.logoutMethod}
                    isAuthenticated={this.state.isAuthenticated}
                    user={this.state.user}
                />
                <main>
                    <Switch>
                        <Route path="/" component={IndexPage} exact={true}/>
                        <Route
                            exact
                            path="/signIn"
                            render={({match, history, location}) => (
                                <SignInPage history={history} loginMethod={this.loginMethod}/>
                            )}
                        />
                        <Route exact path="/signUp" component={SignUpPage}/>
                        <Route exact path="/DoctorSpace" component={DoctorSpacePage}/>
                        <Route exact path="/ListUsers" component={ListUsers}/>
                        <Route exact path="/personalinformation" component={Personalinformation}/>
                        <Route exact path="/userdetails" component={Userdetails}/>

                        <ProtectedRoute
                            isAuthenticated={this.state.isAuthenticated}
                            path="/profile"
                            exact={true}
                            component={() => <ProfilePage user={this.state.user}/>}
                        />
                        <ProtectedRoute
                            isAuthenticated={this.state.isAuthenticated}
                            path="/ProfileUpdateImage"
                            component={() => (
                                <ProfileUpdateImage
                                    updateUserAfterImageChangeMethod={
                                        this.updateUserAfterImageChangeMethod
                                    }
                                    user={this.state.user}
                                />
                            )}
                        />
                        <Route
                            path="/accountActivation/:id"
                            component={AccountActivationPage}
                        />
                        {/* <ProtectedRoute
              isAuthenticated={this.state.isAuthenticated}
              path="/profile"
              component={() => <Profile user={this.state.user} />}
            />
            <ProtectedRoute
              isAuthenticated={this.state.isAuthenticated}
              path="/changeProfileImage"
              component={() => (
                <ProfileChangeImage
                  updateUserAfterImageChangeMethod={
                    this.updateUserAfterImageChangeMethod
                  }
                />
              )}
            />
            <Route component={NotFoundPage} />*/}
                        <Route component={NotFoundPage}/>
                    </Switch>
                </main>
                <Footer/>
            </BrowserRouter>
        );
    }
}

export default AppRouter;

/* <div>
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
      to="/changeProfileImage"
      activeClassName="active-link"
      exact={true}
    >
      change picture
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
</div> */
