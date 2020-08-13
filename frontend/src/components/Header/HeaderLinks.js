/*eslint-disable*/
import React from "react";
import { auth } from "../../firebase";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks() {
  const classes = useStyles();

  // auth.onAuthStateChanged(function (user) {
  //   if (user) {
  //     return (
  //       <List className={classes.list}>
  //         <ListItem className={classes.listItem}>
  //           <Button
  //             href="/"
  //             color="transparent"
  //             className={classes.navLink}
  //           >
  //             Home
  //       </Button>
  //         </ListItem>
  //         <ListItem className={classes.listItem}>
  //           <Button
  //             href="/tests"
  //             color="transparent"
  //             className={classes.navLink}
  //           >
  //             Tests
  //       </Button>
  //         </ListItem>
  //         <ListItem className={classes.listItem}>
  //           <Button
  //             href="/about"
  //             color="transparent"
  //             className={classes.navLink}
  //           >
  //             About Us
  //       </Button>
  //         </ListItem>
  //         <ListItem className={classes.listItem}>
  //           <Button
  //             href="/profile"
  //             color="transparent"
  //             className={classes.navLink}
  //           >
  //             Profile
  //       </Button>
  //         </ListItem>
  //         <ListItem className={classes.listItem}>
  //           <Button
  //             color="transparent"
  //             className={classes.navLink}
  //             onClick={() => { auth.signOut() }}
  //           >
  //             Log Out
  //       </Button>
  //         </ListItem>
  //       </List>
  //     )
  //   } else {
  //     return (
  //       <List className={classes.list}>
  //         <ListItem className={classes.listItem}>
  //           <Button
  //             href="/"
  //             color="transparent"
  //             className={classes.navLink}
  //           >
  //             Home
  //       </Button>
  //         </ListItem>
  //         <ListItem className={classes.listItem}>
  //           <Button
  //             href="/purchases"
  //             color="transparent"
  //             className={classes.navLink}
  //           >
  //             Purchase
  //       </Button>
  //         </ListItem>
  //         <ListItem className={classes.listItem}>
  //           <Button
  //             href="/about"
  //             color="transparent"
  //             className={classes.navLink}
  //           >
  //             About Us
  //       </Button>
  //         </ListItem>
  //         <ListItem className={classes.listItem}>
  //           <Button
  //             href="/login"
  //             color="transparent"
  //             className={classes.navLink}
  //           >
  //             Log In / Sign Up
  //       </Button>
  //         </ListItem>
  //       </List>
  //     )
  //   }
  // });

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="/"
          color="transparent"
          className={classes.navLink}
        >
          Home
    </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/purchases"
          color="transparent"
          className={classes.navLink}
        >
          Purchase
    </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/about"
          color="transparent"
          className={classes.navLink}
        >
          About Us
    </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/login"
          color="transparent"
          className={classes.navLink}
        >
          Log In / Sign Up
    </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          className={classes.navLink}
          onClick={() => { auth.signOut() }}
        >
          Log Out
        </Button>
      </ListItem>
    </List>
  )
}