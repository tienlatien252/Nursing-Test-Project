import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "utils/UserProvider";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header";
import HeaderLinks from "components/Header/HeaderLinks";
import Footer from "components/Footer/Footer";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomTabs from "components/CustomTabs/CustomTabs";
import SignIn from "./Sections/SignIn";
import SignUp from "./Sections/SignUp";

import styles from "assets/jss/material-kit-react/views/loginPage";

import image from "assets/img/blue.jpg";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const user = useContext(UserContext);
  if (user) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="It's Code Blue"
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
