import React from "react";
// @material-ui/core components
import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "components/CustomButtons/Button";
import QuestionsSection from "./Sections/QuestionsSection";

import styles from "assets/jss/material-kit-react/views/aboutPage";

const useStyles = makeStyles(styles);

export default function TestPage({ match }) {
    const classes = useStyles();
    const testId = match.params.testId;

    return (
        <>
            <AppBar className={classes.appBar} style={{ position: "sticky" }}>
                <Toolbar style={{ display: "flex" }}>
                    <Button simple size="lg" style={{ marginLeft: "auto" }}>
                        Submit Test {testId}
                    </Button>
                </Toolbar>
            </AppBar>
            <QuestionsSection testId={testId}></QuestionsSection>
        </>
    );
}
