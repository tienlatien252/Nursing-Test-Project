import React, { useContext } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import UserProvider, { UserContext } from "./providers/UserProvider";
import history from "./utils/history";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import AboutPage from "views/AboutPage/AboutPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import PurchasePage from "views/PurchasePage/PurchasePage.js";
import TestPage from "views/TestPage/TestPage.js";
import PasswordResetPage from "views/LoginPage/PasswordResetPage.js";

export default function App() {
    const user = useContext(UserContext);

    return (
        <Router history={history}>
            <UserProvider>
                <Switch>
                    <Route path="/" component={LandingPage} exact />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/login" render={() => (
                        user==='undefined' || user===null ? <Redirect to='/' /> : <LoginPage />
                    )} />
                    <Route path="/profile" render={() => (
                        !user ? <Redirect to='/login' /> : <ProfilePage />
                    )} />
                    <Route path="/purchases" component={PurchasePage} />
                    <Route path="/tests" render={() => (
                        !user ? <Redirect to='/login' /> : <TestPage />
                    )} />
                    <Route path="/password-reset" component={PasswordResetPage} />
                </Switch>
            </UserProvider>
        </Router>
    );
}