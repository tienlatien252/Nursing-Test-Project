import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle";

const useStyles = makeStyles(styles);

export default function TestsSection() {
  const classes = useStyles();

  const [testArray, setTestArray] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:5000/tests", {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
      });
      const json = await response.json();
      const tests = json["tests"];
      setTestArray(tests);
    }
    fetchData();
  }, []);

  return (
    testArray.map((test) =>
      <GridItem xs={12} sm={12} md={4} key={test["test_id"]}>
        <Card>
          <CardHeader color="primary" className={classes.CardHeader}>
            <h4>{test["test_name"]}</h4>
          </CardHeader>
          <CardBody>
            <p className={classes.description}>
              {test["test_description"]}
              <br />
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum."
            </p>
            <Button simple color="primary" size="lg">
              PURCHASE NOW FOR $$
                  </Button>
          </CardBody>
        </Card>
      </GridItem>)
  );
}
