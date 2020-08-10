import React from "react";
import ReactDOM from "react-dom";
import history from "./utils/history";
import { Router, Route, Switch } from "react-router-dom";
import UserProvider from "./providers/UserProvider";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import AboutPage from "views/AboutPage/AboutPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import PasswordResetPage from "views/LoginPage/PasswordResetPage.js";

ReactDOM.render(
  <Router history={history}>
    <UserProvider>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/about" component={AboutPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/password-reset" component={PasswordResetPage} />
      </Switch>
    </UserProvider>
  </Router>,
  document.getElementById("root")
);
