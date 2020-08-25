import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Here are our tests</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color="primary" className={classes.cardHeader}>
                <h4>Test Name</h4>
              </CardHeader>
              <CardBody>
                <p className={classes.description}>
                  Test description.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button simple color="primary" size="lg">
                  Purchase
                    </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
