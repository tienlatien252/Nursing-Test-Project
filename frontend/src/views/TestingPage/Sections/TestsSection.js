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
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle";
import TestingDialog from "./TestingDialog"

const useStyles = makeStyles(styles);

const client = axios.create({
    baseURL: 'http://localhost:5000',
    json: true
})

export default function TestsSection() {
    const classes = useStyles();

    const [testArray, setTestArray] = useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

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
                        <h5>
                            Purchase Date: {test["purchase_time"].substr(0, 10)}
                            <br />
                            Expiration Date: {test["expire_time"].substr(0, 10)}
                        </h5>
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
                        <Button simple color="primary" size="lg" onClick={handleClickOpen}>
                            Take test
                  </Button>
                    </CardBody>
                </Card>
                <TestingDialog open={open} handleClose={handleClose} testId={test["test_id"]}></TestingDialog>
            </GridItem >)
    );
}
