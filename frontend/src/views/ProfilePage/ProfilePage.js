import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import HeaderLinks from "components/Header/HeaderLinks";
import Parallax from "components/Parallax/Parallax";

import styles from "assets/jss/material-kit-react/views/aboutPage";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const { ...rest } = props;

    return (
        <div>
            <Header
                color="primary"
                brand="It's Code Blue"
                rightLinks={<HeaderLinks />}
                fixed
                {...rest}
            />
            <Parallax small filter image={require("assets/img/blue_cropped.jpg")} />
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <p>This is the profile page.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
