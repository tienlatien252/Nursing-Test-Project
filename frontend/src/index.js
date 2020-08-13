import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import UserProvider from "./providers/UserProvider";
import history from "./utils/history";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import AboutPage from "views/AboutPage/AboutPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import PurchasePage from "views/PurchasePage/PurchasePage.js";
import TestPage from "views/TestPage/TestPage.js";
import PasswordResetPage from "views/LoginPage/PasswordResetPage.js";

import "assets/scss/material-kit-react.scss?v=1.9.0";

ReactDOM.render(
  <Router history={history}>
    <UserProvider>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/about" component={AboutPage} />
        <Route path="/login" component={LoginPage}
        />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/purchases" component={PurchasePage} />
        <Route path="/tests" component={TestPage} />
        <Route path="/password-reset" component={PasswordResetPage} />
      </Switch>
    </UserProvider>
  </Router>,
  document.getElementById("root")
);