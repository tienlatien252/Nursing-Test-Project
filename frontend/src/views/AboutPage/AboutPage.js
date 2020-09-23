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
import TeamSection from "./Sections/TeamSection";
import WorkSection from "./Sections/WorkSection";

import styles from "assets/jss/material-kit-react/views/aboutPage";

const useStyles = makeStyles(styles);

export default function AboutPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="primary"
        brand="It's Code Blue"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/blue.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <TeamSection />
          <WorkSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
