import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();

  const [testArray, setTestArray] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tests")
      .then(response => response.json())
      .then(data => setTestArray(data["tests"]))
    // console.log(`This is your data: ${JSON.stringify(testArray)}`);
  });

  return (
    testArray.map((test) =>
      <GridItem xs={12} sm={12} md={4} key={test["test_id"]} style={{ textAlign: "center" }}>
        <Card>
          <CardHeader color="primary" className={classes.CardHeader}>
            <h4>{test["test_name"]}</h4>
          </CardHeader>
          <CardBody>
            <p className={classes.description}>
              {test["test_description"]}
            </p>
            <Button simple color="primary" size="lg">
              Purchase
                  </Button>
          </CardBody>
        </Card>
      </GridItem>)
  );
}
