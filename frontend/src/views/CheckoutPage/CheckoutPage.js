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
import CheckoutSection from "./Sections/CheckoutSection";
import GridContainer from "components/Grid/GridContainer";

import styles from "assets/jss/material-kit-react/views/aboutPage";

const useStyles = makeStyles(styles);

export default function CheckoutPage(props) {
    const classes = useStyles();
    const { match, ...rest } = props;
    const {params} = match;

    return (
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
                    <div className={classes.section} style={{ textAlign: "center" }}>
                        <h2 className={classes.title}>Checkout</h2>
                        <div>
                            <GridContainer justify="center">
                                <CheckoutSection testId={params.testId}/>
                            </GridContainer>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
