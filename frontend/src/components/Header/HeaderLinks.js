/*eslint-disable*/
import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
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
          href="/profile-page"
          color="transparent"
          className={classes.navLink}
        >
          About Us
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/login-page"
          color="transparent"
          className={classes.navLink}
        >
          Log in
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/signup-page"
          color="transparent"
          className={classes.navLink}
        >
          Sign up
        </Button>
      </ListItem>
    </List>
  );
}
