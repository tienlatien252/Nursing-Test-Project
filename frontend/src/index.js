import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import SignupPage from "views/SignupPage/SignupPage.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Auth0Provider
    domain="dev-e14kaf0s.us.auth0.com"
    clientId="BISSFueKaVtZnQ5dZOOYHXPlYB23O9w3"
    redirectUri={window.location.origin}
  >
    <Router history={hist}>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/profile-page" component={ProfilePage} />
        <Route path="/login-page" component={LoginPage} />
        <Route path="/signup-page" component={SignupPage} />
      </Switch>
    </Router>
  </Auth0Provider>,
  document.getElementById("root")
);
