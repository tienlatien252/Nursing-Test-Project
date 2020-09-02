import React, { useState, useEffect } from "react";
import { auth } from "firebase.js";
import axios from 'axios';
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

const client = axios.create({
    baseURL: 'http://localhost:5000',
    json: true
})

export default function TestsSection() {
    const classes = useStyles();

    const [testArray, setTestArray] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (auth.currentUser) {
                const idToken = await auth.currentUser.getIdToken(true);
                try {
                    const response = await client({
                        method: 'get',
                        url: '/auth/purchases',
                        headers: {
                            'AuthToken': idToken
                        }
                    });
                    const tests = response.data["purchases"];
                    setTestArray(tests);
                } catch (error) {
                    console.log(error);
                }
            }
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
                            Purchasing Time: {test["purchase_time"]}{"\n"}
                            Expiration Time: {test["expire_time"]}{"\n"}
                            {test["test_description"]}
                        </p>
                        <Button simple color="primary" size="lg">
                            Take test
                  </Button>
                    </CardBody>
                </Card>
            </GridItem >)
    );
}
