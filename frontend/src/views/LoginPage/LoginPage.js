import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import SignIn from "./Sections/SignIn.js";
import SignUp from "./Sections/SignUp.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Nursing Test"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <CustomTabs
                headerColor="primary"
                tabs={[
                  {
                    tabName: "Log In",
                    tabContent: (
                      <div style={{ textAlign: "center" }}>
                        <SignIn />
                      </div>
                    )
                  },
                  {
                    tabName: "Sign Up",
                    tabContent: (
                      <div style={{ textAlign: "center" }}>
                        <SignUp />
                      </div>
                    )
                  }
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
