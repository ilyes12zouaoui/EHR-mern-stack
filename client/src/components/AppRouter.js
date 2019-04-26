import React, { Component } from "react";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
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
import DoctorSpacePage2 from "./pages/DoctorSpacePage2";
import ListUsers from "./pages/ListUsers";
import Personalinformation from "./pages/Personalinformation";
import RegisterAsPatient from "./pages/RegisterAsPatient";
import RegisterAsDoctor from "./pages/RegisterAsDoctor";
import RegisterAsPharmacist from "./pages/RegisterAsPharmacist";
import RegisterAsThirdParty from "./pages/RegisterAsThirdParty";
import Userdetails from "./pages/Userdetails";
import List_Medicaments from "./pages/List_Medicaments";
import List_BoughtMedicament from "./pages/List_BoughtMedicament";
import List_access from "./pages/List_access";
import Recom_Predict from "./pages/Recom_Predict";
import UpdateHealthInfoamtions from "./pages/HealthInformations";
import PatientDetails from "./pages/PatientDetails";
import SellMeds from "./pages/SellMedicament";
import ChatPage from "./pages/ChatPage";
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
    this.setState({ role, user, isAuthenticated: true });
  }

  updateUserAfterImageChangeMethod(imageName) {
    if (localStorage.user) {
      let user = JSON.parse(localStorage.user);
      user.image = imageName;
      localStorage.setItem("user", JSON.stringify(user));
      this.setState({ user });
    }
  }

  logoutMethod() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("Authorization");
    localStorage.removeItem("user");
    this.setState({ role: "", user: {}, isAuthenticated: false });
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
            <Route path="/" component={IndexPage} exact={true} />
            <Route
              exact
              path="/signIn"
              render={({ match, history, location }) => (
                <SignInPage history={history} loginMethod={this.loginMethod} />
              )}
            />
            <Route exact path="/signUp" component={SignUpPage} />
            <Route
              exact
              path="/DoctorSpace"
              component={() => <DoctorSpacePage2 user={this.state.user} />}
            />

            <Route
              exact
              path="/ListUsers"
              component={() => <ListUsers user={this.state.user} />}
            />

            <Route
              exact
              path="/List_Medicaments"
              component={List_Medicaments}
            />
            <Route
              exact
              path="/List_BoughtMedicament"
              render={({ match, history, location }) => (
                <List_BoughtMedicament
                  history={history}
                  loginMethod={this.loginMethod}
                />
              )}
            />
            <Route
              exact
              path="/sell/:id"
              render={({ match, history, location }) => (
                <SellMeds
                  history={history}
                  match={match}
                  user={this.state.user}
                />
              )}
            />

            <Route
              exact
              path="/List_access"
              component={() => <List_access user={this.state.user} />}
            />

            <Route
              exact
              path="/personalinformation"
              render={({ match, history, location }) => (
                <Personalinformation history={history} user={this.state.user} />
              )}
            />

            <Route
              exact
              path="/UpdateHealthInfoamtions"
              render={({ match, history, location }) => (
                <UpdateHealthInfoamtions
                  history={history}
                  user={this.state.user}
                />
              )}
            />

            <Route
              exact
              path="/RegisterAsPatient"
              render={({ match, history, location }) => (
                <RegisterAsPatient history={history} user={this.state.user} />
              )}
            />

            <Route
              exact
              path="/RegisterAsDoctor"
              component={() => <RegisterAsDoctor user={this.state.user} />}
            />

            <Route
              exact
              path="/RegisterAsPharmacist"
              component={() => <RegisterAsPharmacist user={this.state.user} />}
            />

            <Route
              exact
              path="/RegisterAsThirdParty"
              component={() => <RegisterAsThirdParty user={this.state.user} />}
            />

            <Route
              exact
              path="/userdetails/:iddoc/:iduser"
              component={Userdetails}
            />

            <Route
              exact
              path="/patientdetails/:idpatient"
              component={PatientDetails}
            />

            <Route
              exact
              path="/recom_predict"
              component={() => <Recom_Predict user={this.state.user} />}
            />

            <ProtectedRoute
              isAuthenticated={this.state.isAuthenticated}
              path="/profile"
              exact={true}
              component={() => <ProfilePage user={this.state.user} />}
            />
            <ProtectedRoute
              isAuthenticated={this.state.isAuthenticated}
              path="/Chat"
              exact={true}
              component={() => (
                <ChatPage user={this.state.user} socket={this.state.socket} />
              )}
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
            <Route component={NotFoundPage} />
          </Switch>
        </main>
        <Footer />
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
