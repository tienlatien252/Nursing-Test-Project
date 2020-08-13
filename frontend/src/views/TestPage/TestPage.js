import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/aboutPage.js";

const useStyles = makeStyles(styles);

export default function AboutPage(props) {
    const classes = useStyles();
    const { ...rest } = props;

    const user = useContext(UserContext);

    return (
        (user === undefined || user === null) ?
            <Redirect to='/login' />
            :
            <div>
                <Header
                    color="transparent"
                    brand="Nursing Test"
                    rightLinks={<HeaderLinks />}
                    fixed
                    changeColorOnScroll={{
                        height: 200,
                        color: "white"
                    }}
                    {...rest}
                />
                <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div className={classes.container}>
                        <p>This is the tests page.</p>
                    </div>
                </div>
                <Footer />
            </div>
    );
}
