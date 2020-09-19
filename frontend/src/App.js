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
import TestingPage from "views/TestingPage/TestingPage";
import QuestionsPage from "views/QuestionsPage/QuestionsPage";
import PurchaseTestPage from "views/PurchaseTestPage/PurchaseTestPage";
import PasswordResetPage from "views/LoginPage/PasswordResetPage";
import CheckoutPage from "views/CheckoutPage/CheckoutPage";

import "assets/scss/material-kit-react.scss?v=1.9.0";

export default function App() {
    return (
        <Router history={history}>
            <Switch>
                <UserProvider>
                    <Route path="/" component={LandingPage} exact />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/purchase-tests" component={PurchaseTestPage} />
                    <Route path="/password-reset" component={PasswordResetPage} />
                    <PrivateRoute path="/profile" component={ProfilePage} />
                    <PrivateRoute path="/testing" component={TestingPage} exact />
                    <PrivateRoute path="/testing/:testId/questions" component={QuestionsPage} />
                    <PrivateRoute path="/checkout/:testId" component={CheckoutPage} />
                </UserProvider>
            </Switch>
        </Router>
    )
}