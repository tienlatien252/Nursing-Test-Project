import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import UserProvider from "./providers/UserProvider";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import PasswordResetPage from "views/LoginPage/PasswordResetPage.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <UserProvider>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/profile-page" component={ProfilePage} />
        <Route path="/login-page" component={LoginPage} />
        <Route path="/password-reset-page" component={PasswordResetPage} />
      </Switch>
    </UserProvider>
  </Router>,
  document.getElementById("root")
);
