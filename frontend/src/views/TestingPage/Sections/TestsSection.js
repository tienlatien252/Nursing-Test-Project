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

export default function TestsSection() {
    const classes = useStyles();

    const [testArray, setTestArray] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:5000/auth/purchases", {
                method: 'GET',
                // headers: myHeaders,
                mode: 'cors',
                cache: 'default',
            });
            const json = await response.json();
            const tests = json["purchases"];
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
                            Purchasing Time: {test["purchase_time"]}
                            Expiration Time: {test["expire_time"]}
                            {test["test_description"]}
                        </p>
                    </CardBody>
                </Card>
            </GridItem>)
    );
}
