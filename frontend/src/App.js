import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import UserProvider from "utils/UserProvider";
import PrivateRoute from "utils/PrivateRoute";
import history from "utils/history";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage";
import AboutPage from "views/AboutPage/AboutPage";
import LoginPage from "views/LoginPage/LoginPage";
import ProfilePage from "views/ProfilePage/ProfilePage";
import PurchasePage from "views/PurchasePage/PurchasePage";
import TestPage from "views/TestPage/TestPage";
import PasswordResetPage from "views/LoginPage/PasswordResetPage";

import "assets/scss/material-kit-react.scss?v=1.9.0";

export default function App() {
    return (
        <Router history={history}>
            <Switch>
                <UserProvider>
                    <Route path="/" component={LandingPage} exact />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/purchases" component={PurchasePage} />
                    <Route path="/password-reset" component={PasswordResetPage} />
                    <PrivateRoute path="/profile" component={ProfilePage} />
                    <PrivateRoute path="/tests" component={TestPage} />
                </UserProvider>
            </Switch>
        </Router>
    )
}