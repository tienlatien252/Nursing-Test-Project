import React, { useState, useMemo } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { auth, generateUserDocument } from "firebase.js";
import { UserContext } from "UserContext.js";
import history from "utils/history.js";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import AboutPage from "views/AboutPage/AboutPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import PurchasePage from "views/PurchasePage/PurchasePage.js";
import TestPage from "views/TestPage/TestPage.js";
import PasswordResetPage from "views/LoginPage/PasswordResetPage.js";

import "assets/scss/material-kit-react.scss?v=1.9.0";

export default function App() {
    const [user, setUser] = useState(null);

    const value = useMemo(() => ({ user, setUser }), [user, setUser]);

    auth.onAuthStateChanged(async userAuth => {
        const user = await generateUserDocument(userAuth);
        setUser(user);
    });
    console.log(user === null);

    return (
        <Router history={history}>
            <Switch>
                <UserContext.Provider value={value}>
                    <Route path="/" component={LandingPage} exact />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/login" render={() => (
                        user === null ? <LoginPage /> : <Redirect to='/'/>
                    )}
                    />
                    <Route path="/profile" render={() => (
                        value.user === null ? <Redirect to='/login' /> : <ProfilePage />
                    )} />
                    <Route path="/purchases" component={PurchasePage} />
                    <Route path="/tests" render={() => (
                        user === null ? <Redirect to='/login' /> : <TestPage />
                    )} />
                    <Route path="/password-reset" component={PasswordResetPage} />
                </UserContext.Provider>
            </Switch>
        </Router>
    )
}